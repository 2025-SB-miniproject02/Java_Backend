// src/pages/MyPages.jsx

import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import ChangePasswordModal from '../components/ChangePasswordModal';

const MyPages = () => {
    const { user, setUser, logout } = useAppContext();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [showConfirmExit, setShowConfirmExit] = useState(false);
    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
    const [showDeleteAccountConfirm, setShowDeleteAccountConfirm] = useState(false); // ⭐️ 회원 탈퇴 확인 모달 상태 추가

    const [formData, setFormData] = useState({
        nickname: '',
        name: '',
        hp: '',
        addressSido: '',
        addressSigungu: '',
        addressRoad: '',
        addressBuildingNumber: '',
        addressDetail: '',
    });

    const placeholders = {
        nickname: user?.mem_nickname || '',
        name: user?.mem_name || '',
        email: user?.memEmail || '',
        hp: user?.mem_hp || '',
        address: user?.mem_addr || '',
    };

    useEffect(() => {
        const fetchMemberInfo = async () => {
            if (user && user.memEmail) {
                try {
                    const response = await fetch(`/spring/member/my_pages?memEmail=${user.memEmail}`);

                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.message || '회원 정보 조회 실패');
                    }

                    const memberData = await response.json();
                    setUser(memberData);
                    console.log('회원 정보 조회 성공:', memberData);

                    const addrParts = memberData.mem_addr ? memberData.mem_addr.split(' ') : [];
                    setFormData({
                        nickname: memberData.mem_nickname || '',
                        name: memberData.mem_name || '',
                        hp: memberData.mem_hp || '',
                        addressSido: addrParts[0] || '',
                        addressSigungu: addrParts[1] || '',
                        addressRoad: addrParts[2] || '',
                        addressBuildingNumber: addrParts[3] || '',
                        addressDetail: addrParts[4] || '',
                    });

                } catch (error) {
                    console.error('회원 정보 조회 에러:', error);
                    alert(`회원 정보를 불러오는데 실패했습니다: ${error.message}`);
                }
            }
        };

        fetchMemberInfo();
    }, [user?.memEmail, setUser]);

    useEffect(() => {
        if (showModal && user) {
            const addrParts = user.mem_addr ? user.mem_addr.split(' ') : [];
            setFormData({
                nickname: user.mem_nickname || '',
                name: user.mem_name || '',
                hp: user.mem_hp || '',
                addressSido: addrParts[0] || '',
                addressSigungu: addrParts[1] || '',
                addressRoad: addrParts[2] || '',
                addressBuildingNumber: addrParts[3] || '',
                addressDetail: addrParts[4] || '',
            });
        }
    }, [showModal, user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const fullAddress = `${formData.addressSido} ${formData.addressSigungu} ${formData.addressRoad} ${formData.addressBuildingNumber} ${formData.addressDetail}`.trim();

        if (!user || !user.memEmail) {
            alert('로그인된 사용자 정보를 찾을 수 없습니다.');
            return;
        }

        try {
            const response = await fetch(`/spring/member/update2`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    memEmail: user.memEmail,
                    mem_nickname: formData.nickname,
                    mem_name: formData.name,
                    mem_hp: formData.hp,
                    mem_addr: fullAddress,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || '회원 정보 수정 실패');
            }

            const updatedUser = await response.json();
            setUser(updatedUser);
            alert('회원 정보가 성공적으로 수정되었습니다.');
            setShowModal(false);
            setShowConfirmExit(false);
        } catch (error) {
            console.error('Error updating user info:', error);
            alert(error.message);
        }
    };

    const handleOutsideClick = () => {
        setShowConfirmExit(true);
    };

    const confirmExit = () => {
        setShowModal(false);
        setShowConfirmExit(false);
    };

    const cancelExit = () => {
        setShowConfirmExit(false);
    };

    // ⭐️ 회원 탈퇴 처리 함수 수정
    const handleDeleteAccount = async () => {
        // user 객체에 mem_id와 memEmail이 모두 있는지 확인
        if (!user || !user.mem_id || !user.memEmail) {
            alert('로그인된 사용자 정보를 찾을 수 없거나 회원 ID가 누락되었습니다.');
            return;
        }

        try {
            // Spring Boot API 호출: mem_id를 경로 변수로, DTO를 요청 바디로 보냄
            const response = await fetch(`/spring/member/delete/${user.mem_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                // DTO에 필요한 필드를 모두 포함 (memEmail, mem_deleted)
                body: JSON.stringify({
                    mem_id: user.mem_id, // PathVariable로도 보내지만, RequestBody DTO에도 포함시키는 것이 안전
                    memEmail: user.memEmail,
                    mem_deleted: 'Y', // 삭제 상태로 변경 요청
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || '회원 탈퇴 처리 실패');
            }

            // 백엔드에서 MemberDTO를 반환하므로, 성공 메시지나 반환 값에 따라 처리
            // const deletedMemberDTO = await response.json(); // 필요하다면 이 값을 활용

            alert('회원 탈퇴 처리가 완료되었습니다.');
            logout(); // AppContext의 logout 함수 호출하여 로컬 스토리지 및 user 상태 초기화
            navigate('/'); // 메인 페이지로 이동
        } catch (error) {
            console.error('회원 탈퇴 에러:', error);
            alert(`회원 탈퇴 중 오류가 발생했습니다: ${error.message}`);
        } finally {
            setShowDeleteAccountConfirm(false); // 모달 닫기
        }
    };


    return (
        <div>
            {showConfirmExit && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="bg-white p-4 rounded shadow-md w-full max-w-xs text-center">
                        <p className="mb-4">
                            수정 중인 내용은 저장되지 않습니다. <br />
                            정말 창을 닫으시겠습니까?
                        </p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={cancelExit}
                                className="text-white px-4 py-1.5 rounded bg-gray-400 hover:bg-gray-500">
                                취소
                            </button>
                            <button
                                onClick={confirmExit}
                                className="px-4 py-1.5 rounded bg-primary/80 hover:bg-primary-dull/90">
                                나가기
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ⭐️ 회원 탈퇴 확인 모달 */}
            {showDeleteAccountConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="bg-white p-6 rounded shadow-md w-full max-w-sm text-center">
                        <h3 className="text-xl font-semibold mb-4 text-red-600">회원 탈퇴</h3>
                        <p className="mb-6">
                            정말 회원 탈퇴를 진행하시겠습니까? <br />
                            탈퇴 후에는 정보를 복구할 수 없습니다.
                        </p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => setShowDeleteAccountConfirm(false)}
                                className="text-white px-4 py-2 rounded bg-gray-400 hover:bg-gray-500">
                                취소
                            </button>
                            <button
                                onClick={handleDeleteAccount} // ⭐️ 탈퇴 처리 함수 호출
                                className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white">
                                탈퇴
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 transition duration-300">
                <div className="flex flex-col items-end w-max mb-8">
                    <p className="text-2xl font-medium uppercase">My Pages</p>
                    <div className="w-16 h-0.5 bg-primary rounded-full"></div>
                </div>

                <div className="bg-white shadow-md rounded-xl p-6 mb-8">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Account Information</h2>

                    <p className="text-sm text-primary hover:underline cursor-pointer mb-2 text-right" onClick={() => setShowModal(true)}>
                        사용자 정보 수정
                    </p>

                    <div className="flex flex-col md:flex-row items-center gap-10">
                        <div className="w-40 h-32 rounded-full overflow-hidden">
                            <img src={assets.profile_icon} alt="Profile" className="w-full h-full object-contain" />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600 w-full">
                            <div>
                                <span className="block font-medium text-gray-800 mb-1">별명</span>
                                <p>{user?.mem_nickname || 'Guest'}</p>
                            </div>
                            <div>
                                <span className="block font-medium text-gray-800 mb-1">이름</span>
                                <p>{user?.mem_name || 'Guest'}</p>
                            </div>
                            <div>
                                <span className="block font-medium text-gray-800 mb-1">Email</span>
                                <p>{user?.memEmail || 'Not provided'}</p>
                            </div>
                            <div>
                                <span className="block font-medium text-gray-800 mb-1">핸드폰</span>
                                <p>{user?.mem_hp || 'Not provided'}</p>
                            </div>
                            <div>
                                <span className="block font-medium text-gray-800 mb-1">대표 주소</span>
                                <p>{user?.mem_addr || 'Not provided'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white shadow-md rounded-xl p-6 mb-8">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Activity</h2>
                    <ul className="flex flex-col gap-3 text-sm text-gray-700">
                        <Link to="/seller" className="flex flex-col gap-3 text-sm text-gray-700">
                            <button className="text-left px-4 py-2 bg-gray-50 border border-gray-200 rounded-md hover:bg-primary/10 transition">
                                My Sellers
                            </button>
                        </Link>

                        <Link to="/my-orders" className="flex flex-col gap-3 text-sm text-gray-700">
                            <button className="text-left px-4 py-2 bg-gray-50 border border-gray-200 rounded-md hover:bg-primary/10 transition">
                                My Orders
                            </button>
                        </Link>

                        <button className="text-left px-4 py-2 bg-gray-50 border border-gray-200 rounded-md hover:bg-primary/10 transition">
                            Product Reviews
                        </button>
                    </ul>
                </div>

                <div className="bg-white shadow-md rounded-xl p-6 mb-8">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Settings</h2>
                    <div className="flex flex-col gap-3 text-sm text-gray-700">
                        <button
                            onClick={() => setShowChangePasswordModal(true)}
                            className="text-left px-4 py-2 bg-gray-50 border border-gray-200 rounded-md hover:bg-primary/10 transition">
                            Change Password
                        </button>
                        {/* ⭐️ 회원 탈퇴 버튼 */}
                        <button
                            onClick={() => setShowDeleteAccountConfirm(true)}
                            className="text-left px-4 py-2 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 transition">
                            Delete Account
                        </button>
                    </div>
                </div>
            </div>

            {/* 회원 정보 수정 모달 (기존과 동일) */}
            {showModal && (
                <div className="fixed inset-0 z-40 flex justify-center items-center" onClick={handleOutsideClick}>
                    <div className="absolute inset-0 bg-white bg-opacity-80 backdrop-blur"></div>
                    <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-md z-50" onClick={(e) => e.stopPropagation()}>
                        <h3 className="text-lg font-semibold text-primary text-center mb-4">사용자 정보 수정</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">별명</label>
                                <input
                                    type="text"
                                    name="nickname"
                                    value={formData.nickname}
                                    placeholder={placeholders.nickname}
                                    onChange={handleChange}
                                    className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">이름</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    placeholder={placeholders.name}
                                    onChange={handleChange}
                                    className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">핸드폰 번호</label>
                                <input
                                    type="tel"
                                    name="hp"
                                    value={formData.hp}
                                    placeholder={placeholders.hp}
                                    onChange={handleChange}
                                    className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
                                    required
                                />
                            </div>

                            <div>
                                <p className="font-medium mb-1">주소</p>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="시/도"
                                        name="addressSido"
                                        value={formData.addressSido}
                                        onChange={handleChange}
                                        className="w-1/2 border border-gray-200 rounded p-2 outline-primary"
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="시/군/구"
                                        name="addressSigungu"
                                        value={formData.addressSigungu}
                                        onChange={handleChange}
                                        className="w-1/2 border border-gray-200 rounded p-2 outline-primary"
                                        required
                                    />
                                </div>
                                <div className="flex gap-2 mt-2">
                                    <input
                                        type="text"
                                        placeholder="도로명"
                                        name="addressRoad"
                                        value={formData.addressRoad}
                                        onChange={handleChange}
                                        className="w-1/2 border border-gray-200 rounded p-2 outline-primary"
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="건물번호"
                                        name="addressBuildingNumber"
                                        value={formData.addressBuildingNumber}
                                        onChange={handleChange}
                                        className="w-1/2 border border-gray-200 rounded p-2 outline-primary"
                                        required
                                    />
                                </div>
                                <input
                                    type="text"
                                    placeholder="상세주소 (예: 3층 302호)"
                                    name="addressDetail"
                                    value={formData.addressDetail}
                                    onChange={handleChange}
                                    className="mt-2 border border-gray-200 rounded w-full p-2 outline-primary"
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmExit(true)}
                                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 cursor-pointer">
                                    취소
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-primary hover:bg-primary-dull text-white rounded-md cursor-pointer">
                                    저장
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* 비밀번호 변경 모달 컴포넌트 렌더링 */}
            {showChangePasswordModal && (
                <ChangePasswordModal
                    onClose={() => setShowChangePasswordModal(false)}
                    userEmail={user?.memEmail}
                />
            )}
        </div>
    );
};

export default MyPages;