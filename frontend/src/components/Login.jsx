import React from 'react';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'; // toast 알림 추가

const Login = () => {
    const { setShowUserLogin, setUser } = useAppContext();
    const [state, setState] = React.useState("login");
    const [name, setName] = React.useState("");
    const [nickName, setNickName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [address, setAddress] = React.useState({
        sido: "",
        sigungu: "",
        road: "",
        buildingNumber: "",
        detail: "",
    });
    const [phone, setPhone] = React.useState("");
    const [showConfirmClose, setShowConfirmClose] = React.useState(false);
    // ⭐️ 회원 복구 관련 상태 추가
    const [showRecoveryModal, setShowRecoveryModal] = React.useState(false);
    const [recoveryEmail, setRecoveryEmail] = React.useState(''); // 복구할 계정의 이메일

    const navigate = useNavigate();

    const hasUnsavedInput = () => {
        if (state === "login") {
            return email !== "" || password !== "";
        } else {
            return (
                name !== "" ||
                nickName !== "" ||
                email !== "" ||
                password !== "" ||
                phone !== "" ||
                Object.values(address).some((v) => v !== "")
            );
        }
    };

    const handleBackgroundClick = () => {
        if (hasUnsavedInput()) {
            setShowConfirmClose(true);
        } else {
            setShowUserLogin(false);
            navigate('/');
        }
    };

    const confirmClose = () => {
        setShowUserLogin(false);
        navigate('/');
    };

    const cancelClose = () => {
        setShowConfirmClose(false);
    };

    // ⭐️ 회원 복구 모달 관련 함수
    const confirmRecovery = async () => {
        try {
            await handleAccountRecovery(recoveryEmail);
            setShowRecoveryModal(false); // 모달 닫기
            // 복구 성공 후, 로그인 폼 초기화 및 재로그인 유도
            setEmail('');
            setPassword('');
        } catch (error) {
            console.error('계정 복구 중 오류:', error);
            toast.error(`계정 복구 실패: ${error.message}`);
        }
    };

    const cancelRecovery = () => {
        setShowRecoveryModal(false); // 모달 닫기
        toast.error("계정 복구를 취소했습니다.");
        // 로그인 폼 초기화
        setEmail('');
        setPassword('');
    };

    // ⭐️ 계정 복구 API 호출 함수
    const handleAccountRecovery = async (emailToRecover) => {
        const loadingToast = toast.loading("계정을 복구 중입니다...");
        try {
            const response = await fetch(`/spring/member/recover/${emailToRecover}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || '계정 복구 실패');
            }

            toast.success("계정이 성공적으로 복구되었습니다! 다시 로그인해주세요.", { id: loadingToast });
            // setUser(null); // 복구 후 바로 로그인 상태로 만들지 않고, 다시 로그인 유도
            // setShowUserLogin(false); // 로그인 모달 닫기
            // navigate('/');
        } catch (error) {
            toast.error(`계정 복구 실패: ${error.message}`, { id: loadingToast });
            throw error; // 에러를 다시 throw하여 confirmRecovery에서 catch하도록 함
        }
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        const fullAddress = `${address.sido} ${address.sigungu} ${address.road} ${address.buildingNumber} ${address.detail}`.trim();

        if (state === "register") {
            try {
                const response = await fetch('/spring/member/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        memEmail: email,
                        mem_addr: fullAddress,
                        mem_hp: phone,
                        mem_password: password, // ⭐️ 실제 서비스에서는 비밀번호를 백엔드에서 해싱하도록 전송
                        mem_name: name,
                        mem_nickname: nickName,
                        mem_deleted: "N", // 초기 회원가입 시 'N'으로 설정
                    }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || '회원가입 실패');
                }

                const data = await response.json();
                setUser(data);
                setShowUserLogin(false);
                navigate('/');
                toast.success("회원가입이 완료되었습니다!"); // 성공 알림

            } catch (error) {
                toast.error(error.message); // 에러 알림
            }
        } else { // 로그인 시도
            try {
                const response = await fetch('/spring/member/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        memEmail: email,
                        mem_password: password,
                    }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    // ⭐️ 백엔드에서 보낸 특정 메시지 확인
                    if (errorData.message && errorData.message.startsWith("ACCOUNT_DELETED:")) {
                        setRecoveryEmail(email); // 복구할 계정의 이메일 저장
                        setShowRecoveryModal(true); // 복구 모달 띄우기
                        // 여기서는 alert 대신 모달을 직접 제어하므로 return
                        return;
                    } else {
                        // 일반적인 로그인 실패 (아이디/비밀번호 불일치 등)
                        toast.error(errorData.message || '로그인 실패: 이메일 또는 비밀번호를 확인해주세요.');
                    }
                    return; // 에러 처리 후 함수 종료
                }

                // 로그인 성공
                const data = await response.json();
                setUser(data);
                setShowUserLogin(false);
                navigate('/');
                toast.success("로그인 성공!");

            } catch (error) {
                console.error('로그인 중 오류 발생:', error);
                toast.error('네트워크 오류 또는 서버 응답 문제');
            }
        }
    };

    return (
        <div
            onClick={handleBackgroundClick}
            className="fixed inset-0 z-50 flex items-center text-sm justify-center bg-black/50"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 relative"
            >
                <form onSubmit={onSubmitHandler} className="flex flex-col gap-4 items-start w-full">
                    <p className="text-2xl font-medium m-auto">
                        <span className="text-primary">User</span> {state === "login" ? "Login" : "Sign Up"}
                    </p>

                    {state === "register" && (
                        <div className="w-full">
                            {/* 회원가입 폼 요소들 (이름, 이메일, 비밀번호, 별명, 핸드폰, 주소) */}
                            <p>이름<span className="ml-1 text-xs text-primary select-none">(필수)</span></p>
                            <input onChange={(e) => setName(e.target.value)} value={name} className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type="text" placeholder="Your name type here" required />
                            <p className="mt-3.5">이메일<span className="ml-1 text-xs text-primary select-none">(필수)</span></p>
                            <input onChange={(e) => setEmail(e.target.value)} value={email} className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type="email" placeholder="Your@Email.com" required />
                            <p className="mt-3.5">비밀번호<span className="ml-1 text-xs text-primary select-none">(필수)</span></p>
                            <input onChange={(e) => setPassword(e.target.value)} value={password} className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type="password" placeholder="Your password type here" required />
                            <p className="mt-3.5">별명<span className="ml-1 text-xs text-primary select-none">(선택)</span></p>
                            <input onChange={(e) => setNickName(e.target.value)} value={nickName} className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type="text" placeholder="Your nickname type here" required />
                            <p className="mt-3.5">핸드폰 번호<span className="ml-1 text-xs text-primary select-none">(필수)</span></p>
                            <div className="flex gap-2">
                                <input type="text" inputMode="numeric" pattern="[0-9]*" maxLength={3} placeholder="010" value={phone.split('-')[0] || ""} onChange={(e) => { const newValue = e.target.value.replace(/\D/g, '').slice(0, 3); const parts = phone.split('-'); setPhone([newValue, parts[1] || "", parts[2] || ""].join('-')); }} className="w-1/3 border border-gray-200 rounded p-2 outline-primary text-center" required />
                                <input type="text" inputMode="numeric" pattern="[0-9]*" maxLength={4} placeholder="1234" value={phone.split('-')[1] || ""} onChange={(e) => { const newValue = e.target.value.replace(/\D/g, '').slice(0, 4); const parts = phone.split('-'); setPhone([parts[0] || "", newValue, parts[2] || ""].join('-')); }} className="w-1/3 border border-gray-200 rounded p-2 outline-primary text-center" required />
                                <input type="text" inputMode="numeric" pattern="[0-9]*" maxLength={4} placeholder="5678" value={phone.split('-')[2] || ""} onChange={(e) => { const newValue = e.target.value.replace(/\D/g, '').slice(0, 4); const parts = phone.split('-'); setPhone([parts[0] || "", parts[1] || "", newValue].join('-')); }} className="w-1/3 border border-gray-200 rounded p-2 outline-primary text-center" required />
                            </div>
                            <div className="mt-4">
                                <p className="font-medium">주소<span className="ml-1 text-xs text-primary select-none">(필수)</span></p>
                                <div className="flex gap-2 mt-1">
                                    <input type="text" placeholder="시/도" value={address.sido} onChange={(e) => setAddress({ ...address, sido: e.target.value })} className="w-1/2 border border-gray-200 rounded p-2 outline-primary" required />
                                    <input type="text" placeholder="시/군/구" value={address.sigungu} onChange={(e) => setAddress({ ...address, sigungu: e.target.value })} className="w-1/2 border border-gray-200 rounded p-2 outline-primary" required />
                                </div>
                                <div className="flex gap-2 mt-2">
                                    <input type="text" placeholder="도로명" value={address.road} onChange={(e) => setAddress({ ...address, road: e.target.value })} className="w-1/2 border border-gray-200 rounded p-2 outline-primary" required />
                                    <input type="text" placeholder="건물번호" value={address.buildingNumber} onChange={(e) => setAddress({ ...address, buildingNumber: e.target.value })} className="w-1/2 border border-gray-200 rounded p-2 outline-primary" required />
                                </div>
                                <input type="text" placeholder="상세주소 (예: 3층 302호)" value={address.detail} onChange={(e) => setAddress({ ...address, detail: e.target.value })} className="mt-2 border border-gray-200 rounded w-full p-2 outline-primary" />
                            </div>
                        </div>
                    )}

                    {state === "login" && (
                        <>
                            <div className="w-full">
                                <p>이메일<span className="ml-1 text-xs text-primary select-none">(필수)</span></p>
                                <input
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
                                    type="email"
                                    placeholder="Your@Email.com"
                                    required
                                />
                            </div>

                            <div className="w-full">
                                <p>비밀번호<span className="ml-1 text-xs text-primary select-none">(필수)</span></p>
                                <input
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
                                    type="password"
                                    placeholder="Your password type here"
                                    required
                                />
                            </div>
                        </>
                    )}

                    <p className="text-sm text-center w-full">
                        {state === "register" ? (
                            <>
                                Already have an account?{' '}
                                <span
                                    onClick={() => setState("login")}
                                    className="text-primary cursor-pointer"
                                >
                                    Click here
                                </span>
                            </>
                        ) : (
                            <>
                                Create an account?{' '}
                                <span
                                    onClick={() => setState("register")}
                                    className="text-primary cursor-pointer"
                                >
                                    Click here
                                </span>
                            </>
                        )}
                    </p>

                    <button type="submit" className="bg-primary hover:bg-primary-dull transition-all text-white w-full py-2 rounded-md cursor-pointer">
                        {state === "register" ? "Create Account" : "Login"}
                    </button>
                </form>

                {showConfirmClose && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-lg">
                        <div className="bg-white p-4 rounded shadow-md w-full max-w-xs text-center">
                            <p className="mb-4">입력 중인 정보가 있습니다. <br /> 정말 창을 닫으시겠습니까?</p>
                            <div className="flex justify-center gap-4">
                                <button onClick={confirmClose} className="text-white px-4 py-1.5 rounded bg-gray-400 hover:bg-gray-500">
                                    예
                                </button>
                                <button onClick={cancelClose} className="px-4 py-1.5 rounded bg-primary/80 hover:bg-primary-dull/90">
                                    아니오
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* ⭐️ 회원 복구 모달 */}
                {showRecoveryModal && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-lg">
                        <div className="bg-white p-4 rounded shadow-md w-full max-w-xs text-center">
                            <p className="mb-4">이미 탈퇴 처리된 계정입니다.<br/>계정을 복구하시겠습니까?</p>
                            <div className="flex justify-center gap-4">
                                <button onClick={confirmRecovery} className="text-white px-4 py-1.5 rounded bg-primary/80 hover:bg-primary-dull/90">
                                    예, 복구합니다.
                                </button>
                                <button onClick={cancelRecovery} className="px-4 py-1.5 rounded bg-gray-400 hover:bg-gray-500">
                                    아니오
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;