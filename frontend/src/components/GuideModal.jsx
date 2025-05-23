import React, { useEffect, useRef, useState } from 'react';

const qualityDetails = {
    최상: {
        icon: '📗',
        color: 'green',
        criteria: {
            헌상태: '새것에 가까운 책',
            표지: '변색 없음, 찢어진 흔적 없음, 닳은 흔적 없음, 낙서 없음, 얼룩 없음, 도서 겉표지 있음',
            책등_책배: '변색 없음, 낙서 없음, 닳은 흔적 없음, 얼룩 없음',
            내부_제본상태: '변색 없음, 낙서 없음, 변형 없음, 얼룩 없음, 접힌 흔적 없음, 제본 탈착 없음',
        },
        note: null,
    },
    상: {
        icon: '📘',
        color: 'blue',
        criteria: {
            헌상태: '약간의 사용감은 있으나 깨끗한 책',
            표지: '희미한 변색이나 작은 얼룩이 있음, 찢어진 흔적 없음, 약간의 모서리 해짐, 낙서 없음, 도서 겉표지 있음',
            책등_책배: '희미한 변색이나 작은 얼룩이 있음, 약간의 닳은 흔적 있음, 낙서 없음',
            내부_제본상태: '변색 없음, 낙서 없음, 변형 없음, 아주 약간의 접힌 흔적 있음, 얼룩 없음, 제본 탈착 없음',
        },
        note: null,
    },
    중: {
        icon: '📙',
        color: 'amber',
        criteria: {
            헌상태: '사용감이 많으며 헌 느낌이 나는 책',
            표지: '전체적인 변색, 모서리 해짐, 오염 있음, 2cm 이하의 찢어짐, 래핑 흔적 있음, 낙서 있음, 도서 겉표지 없음, 아웃케이스 없음',
            책등_책배: '전체적인 변색, 모서리 해짐 있음, 오염 있음, 낙서 있음(이름 포함)',
            내부_제본상태: '변색 있음, 2cm 이하 찢어짐 있음, 5쪽 이하의 필기 및 풀이 또는 밑줄 있음, 얼룩 및 오염 있음, 제본 탈착 없음, 본문 읽기에 지장 없는 부록 없음',
        },
        note: null,
    },
    하: {
        icon: '📕',
        color: 'red',
        criteria: {
            헌상태: '독서 및 이용에 지장이 있는 책',
            표지: '2cm 초과한 찢어짐 있음, 2cm 초과한 크기의 얼룩 있음',
            책등_책배: '2cm 초과한 크기의 얼룩 있음',
            내부_제본상태: '2cm 초과한 찢어짐, 5쪽 초과 낙서, 2cm 초과한 얼룩, 5쪽 초과한 얼룩, 낙장 등의 제본불량',
        },
        note: '※ 하 상태는 판매 불가합니다.',
    },
};

const GuideModal = ({ isOpen, onClose }) => {
    const modalRef = useRef(null);
    const [selected, setSelected] = useState('최상');

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') onClose();
        };
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    if (!isOpen) return null;

    const detail = qualityDetails[selected];

    return (
        <div className="fixed inset-0 bg-white bg-opacity-90 flex justify-center items-center z-50">
            <div
                ref={modalRef}
                className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-8 relative"
            >
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-gray-900"
                >
                    ×
                </button>

                <h2 className="text-xl font-bold text-center mb-6">품질 상태 가이드</h2>

                {/* 탭 선택 버튼 */}
                <div className="flex justify-center gap-2 mb-6">
                    {Object.entries(qualityDetails).map(([level, info]) => (
                        <button
                            type="button"
                            key={level}
                            onClick={() => setSelected(level)}
                            className={`px-3 py-2 rounded-md font-semibold text-sm transition
                                ${selected === level
                                    ? 'bg-gray-200 text-black'
                                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                        >
                            {info.icon} {level}
                        </button>
                    ))}
                </div>

                {/* 탭 내용 */}
                <div className="space-y-4">
                    {Object.entries(detail.criteria).map(([section, desc]) => (
                        <div
                            key={section}
                            className="border rounded-lg p-4 bg-white shadow-sm"
                        >
                            <p className="font-semibold text-gray-800 text-base mb-2">{section}</p>
                            <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
                        </div>
                    ))}
                    {detail.note && (
                        <p className="text-red-600 font-semibold text-sm mt-2">{detail.note}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GuideModal;
