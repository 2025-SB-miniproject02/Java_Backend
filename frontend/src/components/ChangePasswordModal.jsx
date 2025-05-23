// src/components/ChangePasswordModal.jsx

import React, { useState } from 'react';
import toast from 'react-hot-toast'; // ⭐️ toast 알림 시스템 임포트
import { useAppContext } from '../context/AppContext'; // ⭐️ useAppContext 임포트

const ChangePasswordModal = ({ onClose }) => { // ⭐️ userEmail prop 제거
    const { user, logout } = useAppContext(); // ⭐️ user와 logout 함수 가져오기

    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    });
    // const [error, setError] = useState(''); // ❌ toast 사용으로 제거
    // const [success, setSuccess] = useState(''); // ❌ toast 사용으로 제거

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // setError(''); // ❌ toast 사용으로 제거
        // setSuccess(''); // ❌ toast 사용으로 제거
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // setError(''); // ❌ toast 사용으로 제거
        // setSuccess(''); // ❌ toast 사용으로 제거

        // 사용자 정보 유효성 검사 (로그인 상태 확인)
        if (!user || !user.memEmail) {
            toast.error("로그인 정보가 없습니다. 다시 로그인해주세요.");
            onClose(); // 모달 닫기
            logout(); // 로그인 정보 없으면 강제 로그아웃
            return;
        }

        const { currentPassword, newPassword, confirmNewPassword } = formData;

        // 1. 프론트엔드 유효성 검사
        if (!currentPassword || !newPassword || !confirmNewPassword) {
            toast.error('모든 필드를 입력해주세요.'); // ⭐️ toast 사용
            return;
        }
        if (newPassword !== confirmNewPassword) {
            toast.error('새 비밀번호와 비밀번호 확인이 일치하지 않습니다.'); // ⭐️ toast 사용
            return;
        }
        if (newPassword.length < 8) { // 최소 길이 검사 (예시)
            toast.error('새 비밀번호는 최소 8자 이상이어야 합니다.'); // ⭐️ toast 사용
            return;
        }
        if (currentPassword === newPassword) { // 현재 비밀번호와 새 비밀번호 동일 여부 검사
            toast.error('새 비밀번호는 현재 비밀번호와 같을 수 없습니다.'); // ⭐️ toast 사용
            return;
        }

        // 로딩 토스트 시작
        const loadingToastId = toast.loading("비밀번호를 변경 중입니다...");

        // 2. 백엔드 API 호출
        try {
            // 백엔드 비밀번호 변경 API 경로: /spring/member/change-password
            const response = await fetch(`/spring/member/change-password`, { // ⭐️ 경로 변경
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${token}` // JWT 사용 시 토큰 포함
                },
                body: JSON.stringify({
                    memEmail: user.memEmail, // ⭐️ AppContext에서 가져온 user 이메일 사용
                    currentPassword: currentPassword, // ⭐️ 현재 비밀번호 포함
                    newPassword: newPassword,         // ⭐️ 새로운 비밀번호 포함
                }),
            });

            if (!response.ok) {
                // 백엔드에서 에러 메시지를 텍스트로 반환하는 경우
                const errorText = await response.text();
                throw new Error(errorText || '비밀번호 변경 실패');
            }

            // 성공 응답 처리
            toast.success('비밀번호가 성공적으로 변경되었습니다!', { id: loadingToastId }); // ⭐️ toast 사용
            // 성공 후 모달 닫기
            setTimeout(() => {
                onClose();
            }, 1000); // 1초 후 닫기
        } catch (err) {
            console.error('비밀번호 변경 에러:', err);
            toast.error(err.message || '비밀번호 변경 중 오류가 발생했습니다.', { id: loadingToastId }); // ⭐️ toast 사용
        }
    };

    return (
        <div className="fixed inset-0 z-40 flex justify-center items-center" onClick={onClose}>
            <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur"></div> {/* 배경 불투명도 및 블러 효과 */}

            <div
                className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-md z-50 py-12"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                    &times;
                </button>
                <h3 className="text-2xl font-medium m-auto text-center mb-6">
                    <span className="text-primary">비밀번호</span> 변경
                </h3>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* 현재 비밀번호 필드 - 백엔드에서 검증함 */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">현재 비밀번호</label>
                        <input
                            type="password"
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleChange}
                            className="border border-gray-300 rounded w-full p-2 outline-primary"
                            placeholder="현재 비밀번호"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">새 비밀번호</label>
                        <input
                            type="password"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            className="border border-gray-300 rounded w-full p-2 outline-primary"
                            placeholder="새 비밀번호"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">새 비밀번호 확인</label>
                        <input
                            type="password"
                            name="confirmNewPassword"
                            value={formData.confirmNewPassword}
                            onChange={handleChange}
                            className="border border-gray-300 rounded w-full p-2 outline-primary"
                            placeholder="새 비밀번호 다시 입력"
                            required
                        />
                    </div>

                    {/* ❌ 에러/성공 메시지 표시는 toast로 대체
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    {success && <p className="text-green-500 text-sm mt-2">{success}</p>}
                    */}

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 cursor-pointer">
                            취소
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-primary hover:bg-primary-dull text-white rounded-md cursor-pointer">
                            비밀번호 변경
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePasswordModal;