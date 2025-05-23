import React, { useState, useEffect, useRef } from 'react';
import { assets } from '../../assets/assets'; // assets는 더 이상 필요 없지만, UI에 남아있다면 일단 놔둡니다.
import GuideModal from '../../components/GuideModal';
import { springApi } from '../../config/axiosInstance';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const formatPrice = (value) => {
    if (!value) return '';
    const num = value.toString().replace(/\D/g, '');
    if (!num) return '';
    const cleaned = num.replace(/^0+/, '') || '0';
    return cleaned.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const AddProduct = () => {
    // const [files, setFiles] = useState([]); // ✅ 제거: 파일 상태 제거
    const [title, setTitle] = useState('');
    const [isbn, setIsbn] = useState(['', '', '', '', '']);
    const [bookInfo, setBookInfo] = useState(null);
    const [bookNotFound, setBookNotFound] = useState(false);
    const [condition, setCondition] = useState('');
    const [priceOriginal, setPriceOriginal] = useState('');
    const [priceSale, setPriceSale] = useState('');
    const [isGuideOpen, setIsGuideOpen] = useState(false);
    const [description, setDescription] = useState('');
    const [memId, setMemId] = useState(1); // 임시 회원 ID

    const [isTitleAuto, setIsTitleAuto] = useState(false);
    const [isPriceAuto, setIsPriceAuto] = useState(false);

    const [usePricePrediction, setUsePricePrediction] = useState(false);
    const [predictedPrice, setPredictedPrice] = useState(null);
    const [autoApplyPredictedPrice, setAutoApplyPredictedPrice] = useState(false);

    const maxLengths = [3, 2, 4, 3, 1];

    const isbnRefs = [
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
    ];

    const navigate = useNavigate();

    const handleIsbnChange = (index, value) => {
        let filtered = value.replace(/[^0-9]/g, '');
        if (filtered.length > maxLengths[index]) filtered = filtered.slice(0, maxLengths[index]);
        const newIsbn = [...isbn];
        newIsbn[index] = filtered;
        setIsbn(newIsbn);
        if (filtered.length === maxLengths[index] && index < isbn.length - 1) {
            isbnRefs[index + 1].current.focus();
        }
    };

    const fullIsbn = isbn.join('');

    useEffect(() => {
        const fetchBookDetails = async () => {
            if (fullIsbn.length === 13) {
                try {
                    const response = await springApi.get(`/book/seller?book_id=${Number(fullIsbn)}`);
                    const data = response.data;

                    if (data) {
                        setBookInfo({
                            title: data.book_title,
                            publisher: data.book_publisher,
                            author: data.book_author,
                            category: data.category_name,
                            price: data.book_original_price,
                            publishDate: data.book_Date || data.book_date,
                            pageCount: data.book_pages,
                            weight: data.book_weight,
                            width: data.book_width,
                            height: data.book_height,
                            binding: data.book_binding,
                            bookId: data.book_id
                        });
                        setBookNotFound(false);
                        setTitle(data.book_title);
                        setPriceOriginal(data.book_original_price ? data.book_original_price.toString() : '');
                        setIsTitleAuto(true);
                        setIsPriceAuto(true);
                    } else {
                        setBookInfo(null);
                        setBookNotFound(true);
                        setIsTitleAuto(false);
                        setIsPriceAuto(false);
                    }
                } catch (error) {
                    console.error("Error fetching book info:", error);
                    if (error.response) {
                        if (error.response.status === 404) {
                            setBookNotFound(true);
                            console.log("책 정보를 찾을 수 없음 (404):", error.response.data);
                        } else {
                            console.error('Failed to fetch book data (HTTP Error):',
                                          error.response.status,
                                          error.response.data || error.response.statusText);
                            setBookNotFound(true);
                        }
                    } else if (error.request) {
                        console.error("No response received (Network Error):", error.request);
                        setBookNotFound(true);
                    } else {
                        console.error("Error setting up request:", error.message);
                        setBookNotFound(true);
                    }
                    setBookInfo(null);
                    setIsTitleAuto(false);
                    setIsPriceAuto(false);
                }
            } else {
                setBookInfo(null);
                setBookNotFound(false);
                setIsTitleAuto(false);
                setIsPriceAuto(false);
            }
        };

        fetchBookDetails();
    }, [fullIsbn]);

    useEffect(() => {
        const fetchPredictedPrice = async () => {
            // ✅ 예측 조건 강화: bookInfo, priceOriginal이 모두 유효한지 확인
            if (usePricePrediction && condition && fullIsbn.length === 13 && bookInfo) {
                const originalPriceNum = Number(priceOriginal);

                // ✅ 정가가 유효한 숫자인지 확인
                if (isNaN(originalPriceNum) || originalPriceNum <= 0) {
                    console.warn("가격 예측: 정가가 유효하지 않습니다.", { priceOriginal, originalPriceNum });
                    setPredictedPrice(null);
                    return; // 유효하지 않으면 예측 요청을 보내지 않음
                }

                try {
                    const flaskApiUrl = 'http://127.0.0.1:5000/predict';

                    // ⭐️ 이 부분이 핵심입니다: Flask 서버가 예상하는 한글 키 이름을 사용하고,
                    // 스프링 부트의 BookDTO에서 가져온 데이터를 매핑합니다.
                    const predictionData = {
                        // Spring Boot의 book_original_price -> Flask의 "정가"
                        "정가": originalPriceNum, 
                        // 프론트엔드의 condition useState 값 -> Flask의 "품질"
                        "품질": condition, 
                        // Spring Boot의 book_publisher -> Flask의 "출판사"
                        "출판사": bookInfo.publisher, 
                        // Spring Boot의 book_date -> Flask의 "출판일"
                        "출판일": bookInfo.publishDate, 
                        // Spring Boot의 book_binding -> Flask의 "제본방식"
                        "제본방식": bookInfo.binding, 
                        // Spring Boot의 book_pages -> Flask의 "페이지수"
                        "페이지수": bookInfo.pageCount, 
                        // Spring Boot의 book_weight -> Flask의 "책무게_g"
                        "책무게_g": bookInfo.weight, 
                        // Spring Boot의 book_width -> Flask의 "가로_mm"
                        "가로_mm": bookInfo.width, 
                        // Spring Boot의 book_height -> Flask의 "세로_mm"
                        "세로_mm": bookInfo.height,
                        // Flask 모델이 필요로 하지 않는 필드는 보내지 않습니다.
                        // (예: book_title, book_author는 Flask 모델의 required_fields에 없으므로)
                    };

                    // ✅ 디버깅을 위해 보내는 데이터를 콘솔에 출력
                    console.log("플라스크로 보내는 예측 데이터:", predictionData);

                    const response = await axios.post(flaskApiUrl, predictionData, {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    // ✅ Flask 응답 키가 'prediction'으로 변경되었음을 확인
                    if (response.data && response.data.prediction !== undefined) { 
                        setPredictedPrice(Math.round(response.data.prediction).toString());
                        console.log("예측 가격 수신:", response.data.prediction);
                    } else {
                        console.warn("예측 가격 응답 형식 오류:", response.data);
                        setPredictedPrice(null);
                    }
                } catch (error) {
                    console.error("가격 예측 오류:", error);
                    setPredictedPrice(null);
                    if (error.response) {
                        console.error("예측 서버 응답 상태:", error.response.status);
                        console.error("예측 서버 응답 데이터:", error.response.data);

                        let errorMessage = '서버 오류';
                        // ✅ Flask 에러 키가 'error'임을 확인하고, JSON 형태의 에러 응답 처리
                        if (error.response.data && typeof error.response.data === 'object' && error.response.data.error) { 
                            errorMessage = error.response.data.error;
                        } else if (error.response.data && typeof error.response.data === 'string') {
                            errorMessage = error.response.data;
                        } else if (error.response.statusText) {
                            errorMessage = error.response.statusText;
                        } else {
                            errorMessage = `알 수 없는 서버 오류: ${JSON.stringify(error.response.data)}`;
                        }
                        alert(`가격 예측 실패: ${errorMessage}`);
                    } else if (error.request) {
                        console.error("예측 서버 연결 오류 (응답 없음):", error.request);
                        alert("가격 예측 실패: 예측 서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.");
                    } else {
                        alert(`가격 예측 실패: ${error.message}`);
                    }
                }
            } else {
                setPredictedPrice(null);
            }
        };

        fetchPredictedPrice();
    }, [usePricePrediction, priceOriginal, condition, fullIsbn, bookInfo]);

    useEffect(() => {
        if (autoApplyPredictedPrice && predictedPrice) {
            setPriceSale(predictedPrice);
        }
    }, [autoApplyPredictedPrice, predictedPrice]);

    const discountPercent =
        priceOriginal && Number(priceOriginal) > 0 && priceSale
            ? Math.floor(((Number(priceOriginal) - Number(priceSale)) / Number(priceOriginal)) * 100)
            : null;

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
        if (isTitleAuto) setIsTitleAuto(false);
    };

    const handlePriceOriginalChange = (e) => {
        const value = e.target.value;
        const onlyNums = value.replace(/\D/g, '');
        setPriceOriginal(onlyNums);
        if (isPriceAuto) setIsPriceAuto(false);
    };

    const handlePriceSaleChange = (e) => {
        const value = e.target.value;
        const onlyNums = value.replace(/\D/g, '');
        setPriceSale(onlyNums);
        if (autoApplyPredictedPrice) setAutoApplyPredictedPrice(false);
    };

    const qualityDetails = {
        최상: { icon: '📗'},
        상: { icon: '📘'},
        중: { icon: '📙'},
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        if (!title || !fullIsbn || fullIsbn.length !== 13 || !condition || !priceOriginal || !priceSale) {
            alert("모든 필수 정보를 입력해주세요."); // ✅ 이미지 업로드 관련 메시지 제거
            return;
        }
        if (Number(priceSale) > Number(priceOriginal)) {
            alert("판매가는 정가보다 높을 수 없습니다.");
            return;
        }
        if (!bookInfo || !bookInfo.bookId) {
            alert("책 정보가 올바르게 조회되지 않았습니다. ISBN을 확인해주세요.");
            return;
        }

        const saleData = {
            sale_book_id: bookInfo.bookId,
            sale_mem_id: memId,
            // sale_image: null, // ✅ sale_image는 백엔드에서 null 또는 빈 문자열로 처리될 것입니다.
            sale_condition: condition,
            sale_description: description,
            sale_price: Number(priceSale),
            sale_predicted: usePricePrediction && predictedPrice ? Number(predictedPrice) : 0,
        };

        // ✅ JSON 데이터만 보내도록 변경
        try {
            const response = await springApi.post('/sale/insert', saleData, {
                headers: {
                    'Content-Type': 'application/json', // ✅ Content-Type 변경
                },
            });

            if (response.status === 200 || response.status === 201) {
                alert("상품이 성공적으로 등록되었습니다!");
                onResetHandler();
                navigate('/seller/product-list');
            } else {
                console.warn("상품 등록 응답:", response);
                alert("상품 등록에 성공했지만, 예상치 못한 응답이 있었습니다.");
            }
        } catch (error) {
            console.error("상품 등록 중 오류 발생:", error);
            if (error.response) {
                console.error("Error response data:", error.response.data);
                alert(`상품 등록 실패: ${error.response.data.message || error.response.data || '서버 오류'}`);
            } else if (error.request) {
                alert("상품 등록 실패: 서버에 연결할 수 없습니다. 네트워크 상태를 확인해주세요.");
            } else {
                alert(`상품 등록 실패: ${error.message}`);
            }
        }
    };

    const onResetHandler = () => {
        // setFiles([]); // ✅ 제거: 파일 상태 초기화 제거
        setTitle('');
        setIsbn(['', '', '', '', '']);
        setBookInfo(null);
        setBookNotFound(false);
        setCondition('');
        setPriceOriginal('');
        setPriceSale('');
        setDescription('');
        setIsGuideOpen(false);
        setUsePricePrediction(false);
        setPredictedPrice(null);
        setAutoApplyPredictedPrice(false);
        setIsTitleAuto(false);
        setIsPriceAuto(false);
    };

    return (
        <div className="flex flex-row justify-between px-8 py-6 gap-10 h-[95vh] overflow-y-auto no-scrollbar w-full max-w-full mx-auto">

            <form onSubmit={onSubmitHandler} className="flex flex-col flex-1 max-w-lg space-y-5">

                {/* ✅ 이미지 업로드 관련 UI 제거 또는 주석 처리 */}
                {/* <div>
                    <p className="text-base font-medium">Product Image</p>
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                        {Array(4).fill('').map((_, index) => (
                            <label key={index} htmlFor={`image${index}`}>
                                <input
                                    onChange={(e) => {
                                        const updateFiles = [...files];
                                        updateFiles[index] = e.target.files[0];
                                        setFiles(updateFiles);
                                    }}
                                    accept="image/*"
                                    type="file"
                                    id={`image${index}`}
                                    hidden
                                />
                                <img
                                    className="max-w-24 cursor-pointer rounded border border-gray-300"
                                    src={files[index] ? URL.createObjectURL(files[index]) : assets.upload_area}
                                    alt="uploadArea"
                                    width={100}
                                    height={100}
                                />
                            </label>
                        ))}
                    </div>
                </div> */}

                <div className="flex flex-col gap-1 relative">
                    <label className="text-base font-medium" htmlFor="title">책 제목</label>
                    <input
                        id="title"
                        type="text"
                        placeholder="책 제목 입력"
                        value={title}
                        onChange={handleTitleChange}
                        className={`outline-primary py-2 px-3 rounded border border-gray-500/40 text-sm ${isTitleAuto ? 'bg-gray-100' : ''}`}
                        required
                        readOnly={isTitleAuto}
                    />
                    {isTitleAuto && (
                        <span className="ml-2 mt-1 block text-xs text-primary select-none">
                            자동 입력
                        </span>
                    )}
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-base font-medium">ISBN</label>
                    <div className="flex items-center gap-2">
                        {isbn.map((segment, index) => (
                            <React.Fragment key={index}>
                                {index !== 0 && <span>-</span>}
                                <input
                                    type="text"
                                    value={segment}
                                    onChange={(e) => handleIsbnChange(index, e.target.value)}
                                    maxLength={maxLengths[index]}
                                    className="outline-primary py-2 px-3 rounded border border-gray-500/40 text-center text-sm"
                                    placeholder={'0'.repeat(maxLengths[index])}
                                    ref={isbnRefs[index]}
                                    required
                                    style={{ width: `${maxLengths[index] * 10 + 25}px` }}
                                />
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-1 relative">
                    <div>
                        <label className="text-base font-medium" htmlFor="condition">품질 상태</label>
                        <button
                            type="button"
                            onClick={() => setIsGuideOpen(true)}
                            className="text-xs text-primary underline ml-3 mt-3 text-left">
                            품질 상태 가이드 보기
                        </button>

                        <GuideModal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />
                    </div>
                    <div className="flex gap-3 mt-2">
                        {Object.entries(qualityDetails).map(([level, info]) => {
                            const isSelected = condition === level;
                            return (
                            <button
                                key={level}
                                type="button"
                                onClick={() => setCondition(level)}
                                className={`flex items-center gap-1 px-3 py-2 rounded-md font-nomal text-sm transition
                                ${isSelected
                                    ? 'bg-gray-200 text-black outline outline-2 outline-primary font-semibold'
                                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:outline-primary'}
                                `}
                            >
                                <span>{info.icon}</span>
                                <span>{level}</span>
                            </button>
                            );
                        })}
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-base font-medium" htmlFor="description">상품 상세 설명</label>
                    <textarea
                        id="description"
                        rows="4"
                        placeholder="상품의 특징, 오염, 낙서 등 상세 설명을 입력해주세요."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="outline-primary py-2 px-3 rounded border border-gray-500/40 text-sm"
                    ></textarea>
                </div>

                <div className="flex gap-4 relative">
                    <div className="flex flex-col gap-1 flex-1 relative">
                        <label htmlFor="priceOriginal" className="text-base font-medium">정가 (₩)</label>
                        <input
                            type="text"
                            id="priceOriginal"
                            value={formatPrice(priceOriginal)}
                            onChange={handlePriceOriginalChange}
                            className={`outline-primary py-2 px-3 rounded border border-gray-500/40 text-sm ${isPriceAuto ? 'bg-gray-100' : ''}`}
                            placeholder="10,000"
                            inputMode="numeric"
                            pattern="[0-9,]*"
                            required
                            readOnly={isPriceAuto}
                        />
                        {isPriceAuto && (
                            <span className="ml-2 mt-1 block text-xs text-primary select-none">
                                자동 입력
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col gap-1 flex-1">
                        <label htmlFor="priceSale" className="text-base font-medium">판매가 (₩)</label>
                        <input
                            type="text"
                            id="priceSale"
                            value={formatPrice(priceSale)}
                            onChange={handlePriceSaleChange}
                            className="outline-primary py-2 px-3 rounded border border-gray-500/40 text-sm"
                            placeholder="9,000"
                            inputMode="numeric"
                            pattern="[0-9,]*"
                            required
                        />
                        {priceOriginal && priceSale && Number(priceSale) > Number(priceOriginal) && (
                        <p className="ml-2 mt-1 block text-xs text-primary select-none">
                            판매가가 정가보다 높습니다. <br/>가격을 다시 확인해주세요.
                        </p>
                        )}
                    </div>
                </div>

                <div className="flex items-center mt-4 gap-6">
                    <label htmlFor="usePricePrediction" className="relative inline-flex items-center cursor-pointer select-none">
                        <input
                            type="checkbox"
                            id="usePricePrediction"
                            checked={usePricePrediction}
                            onChange={() => setUsePricePrediction(!usePricePrediction)}
                            className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-primary/80 transition-colors"></div>
                        <div className="absolute left-0.5 top-0.5 bg-white border border-gray-300 rounded-full w-5 h-5
                                peer-checked:translate-x-full peer-checked:border-primary transition-transform"></div>
                        <span className="ml-4 text-sm text-gray-700">가격 예측 사용</span>
                    </label>

                    {usePricePrediction && predictedPrice && (
                        <label htmlFor="autoApplyPredictedPrice" className="relative inline-flex items-center cursor-pointer select-none">
                            <input
                                type="checkbox"
                                id="autoApplyPredictedPrice"
                                checked={autoApplyPredictedPrice}
                                onChange={() => setAutoApplyPredictedPrice(!autoApplyPredictedPrice)}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-primary/80 transition-colors"></div>
                            <div className="absolute left-0.5 top-0.5 bg-white border border-gray-300 rounded-full w-5 h-5
                                    peer-checked:translate-x-full peer-checked:border-primary transition-transform"></div>
                            <span className="ml-4 text-sm text-gray-700">예측값 자동 적용</span>
                        </label>
                    )}
                </div>

                {usePricePrediction && predictedPrice && (
                    <p className="mt-1 text-sm">
                        권장하는 판매가 : <span className="text-primary">{formatPrice(predictedPrice)} 원</span>
                    </p>
                )}

                {discountPercent !== null && (
                    <p className="mt-1 text-sm">
                        정가 대비 할인율 : <span className="text-primary">{discountPercent}%</span>
                    </p>
                )}

                <div className="flex gap-3 mt-6">
                    <button type="button" onClick={onResetHandler} className="flex-1 py-3 border border-gray-400 rounded font-medium hover:bg-gray-100">
                        초기화
                    </button>
                    <button type="submit" className="flex-1 py-3 text-white rounded font-medium bg-primary/80 hover:bg-primary-dull">
                        등록
                    </button>
                </div>
            </form>

            {/* 책 정보 출력 영역 (변동 없음) */}
            <div className="flex-1 max-w-lg h-105 p-6 border border-gray-300 rounded-lg bg-white shadow-md overflow-auto">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b border-gray-200 pb-2">
                    📚 책 정보
                </h2>

                {bookNotFound ? (
                    <p className="text-red-600 font-semibold text-center py-10">
                        해당 ISBN의 책 정보를 찾을 수 없습니다.
                    </p>
                ) : bookInfo ? (
                    <dl className="grid grid-cols-2 gap-x-6 gap-y-4 text-gray-700 text-sm">
                    <div>
                        <dt className="font-semibold text-gray-900">제목</dt>
                        <dd className="mt-1">{bookInfo.title}</dd>
                    </div>
                    <div>
                        <dt className="font-semibold text-gray-900">출판사</dt>
                        <dd className="mt-1">{bookInfo.publisher}</dd>
                    </div>
                    <div>
                        <dt className="font-semibold text-gray-900">저자</dt>
                        <dd className="mt-1">{bookInfo.author}</dd>
                    </div>
                    <div>
                        <dt className="font-semibold text-gray-900">분류</dt>
                        <dd className="mt-1">{bookInfo.category}</dd>
                    </div>
                    <div>
                        <dt className="font-semibold text-gray-900">정가</dt>
                        <dd className="mt-1">{bookInfo.price.toLocaleString('ko-KR')}원</dd>
                    </div>
                    <div>
                        <dt className="font-semibold text-gray-900">출판일</dt>
                        <dd className="mt-1">{bookInfo.publishDate}</dd>
                    </div>
                    <div>
                        <dt className="font-semibold text-gray-900">페이지 수</dt>
                        <dd className="mt-1">{bookInfo.pageCount}쪽</dd>
                    </div>
                    <div>
                        <dt className="font-semibold text-gray-900">무게</dt>
                        <dd className="mt-1">{bookInfo.weight}g</dd>
                    </div>
                    <div>
                        <dt className="font-semibold text-gray-900">크기</dt>
                        <dd className="mt-1">{bookInfo.width} x {bookInfo.height} mm</dd>
                    </div>
                    <div>
                        <dt className="font-semibold text-gray-900">제본</dt>
                        <dd className="mt-1">{bookInfo.binding}</dd>
                    </div>
                    </dl>
                ) : (
                    <p className="text-gray-500 italic text-center py-10">
                        ISBN을 입력하면 자동으로 책 정보를 불러옵니다.
                    </p>
                )}
            </div>
        </div>
    );
};

export default AddProduct;