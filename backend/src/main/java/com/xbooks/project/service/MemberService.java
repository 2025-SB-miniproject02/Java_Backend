package com.xbooks.project.service;

import org.springframework.stereotype.Service;

import com.xbooks.project.dto.MemberAuthDTO;
import com.xbooks.project.dto.MemberChangePasswordDTO;
import com.xbooks.project.dto.MemberDTO;
import com.xbooks.project.exception.ResourceNotFoundException;
import com.xbooks.project.model.Member;
import com.xbooks.project.repository.MemberRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberService {
    private final MemberRepository memberRepository;

    public MemberAuthDTO convertToAuthDTO(Member member){
        return MemberAuthDTO.builder()
                .memEmail(member.getMemEmail())
                .mem_password(member.getMem_password())
                .build();
    }

    public Member convertToEntity(MemberAuthDTO memberAuthDTO){
        Member member = new Member();
        member.setMemEmail(memberAuthDTO.getMemEmail());
        member.setMem_password(memberAuthDTO.getMem_password());
        return member;
    }

    public MemberDTO convertToMemberDTO(Member member){
        return MemberDTO.builder()
                .mem_id(member.getMem_id())
                .memEmail(member.getMemEmail())
                .mem_password(member.getMem_password())
                .mem_addr(member.getMem_addr())
                .mem_hp(member.getMem_hp())
                .mem_name(member.getMem_name())
                .mem_nickname(member.getMem_nickname())
                .mem_deleted(member.getMem_deleted())
                .build();
    }

    public Member convertToEntity(MemberDTO memberDTO){
        Member member = new Member();
        member.setMem_id(memberDTO.getMem_id());
        member.setMemEmail(memberDTO.getMemEmail());
        member.setMem_password(memberDTO.getMem_password());
        member.setMem_addr(memberDTO.getMem_addr());
        member.setMem_hp(memberDTO.getMem_hp());
        member.setMem_name(memberDTO.getMem_name());
        member.setMem_nickname(memberDTO.getMem_nickname());
        member.setMem_deleted(memberDTO.getMem_deleted());
        return member;
    }

    public MemberDTO signUp(MemberDTO memberDTO){
        return convertToMemberDTO(this.memberRepository.save(convertToEntity(memberDTO)));
    }

    public MemberAuthDTO logIn(MemberAuthDTO mem_auth){
        Member member = this.memberRepository.findByMemEmail(mem_auth.getMemEmail())
                                             .orElseThrow(() -> new ResourceNotFoundException("존재하지 않는 이메일입니다."));

        if (!mem_auth.getMem_password().equals(member.getMem_password())){
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다!");
        }

        if ("Y".equals(member.getMem_deleted())) {
            throw new IllegalStateException("ACCOUNT_DELETED: 이미 탈퇴 처리된 계정입니다. 계정을 복구하시겠습니까?");
        }

        return convertToAuthDTO(member);
    };

    public MemberDTO recoverAccount(String memEmail) {
        Member member = memberRepository.findByMemEmail(memEmail)
                .orElseThrow(() -> new ResourceNotFoundException("해당 이메일의 회원을 찾을 수 없습니다."));

        if ("N".equals(member.getMem_deleted())) {
            throw new IllegalArgumentException("이 계정은 탈퇴 상태가 아닙니다.");
        }

        member.setMem_deleted("N"); // 'N'으로 변경하여 복구
        return convertToMemberDTO(memberRepository.save(member));
    }

    public MemberDTO getMemberView(String memEmail){
        Member member = this.memberRepository.findByMemEmail(memEmail)
                                             .orElseThrow(() -> new ResourceNotFoundException("존재하지 않는 이메일입니다."));
        
        return convertToMemberDTO(member);                                     
    }

    public MemberDTO changeMemberPassword(MemberChangePasswordDTO changePasswordDTO) { // ⭐️ 메서드명 변경 (혼동 방지)
        // 1. 이메일로 회원 조회
        Member member = memberRepository.findByMemEmail(changePasswordDTO.getMemEmail())
                .orElseThrow(() -> new ResourceNotFoundException("해당 이메일의 회원을 찾을 수 없습니다."));

        // 2. 현재 비밀번호 일치 여부 확인 (⭐️ 중요: 암호화 없이 직접 비교)
        if (!changePasswordDTO.getCurrentPassword().equals(member.getMem_password())) {
            throw new IllegalArgumentException("현재 비밀번호가 일치하지 않습니다.");
        }

        // 3. 새로운 비밀번호를 현재 비밀번호와 다르게 설정했는지 확인
        if (changePasswordDTO.getNewPassword().equals(member.getMem_password())) {
            throw new IllegalArgumentException("새로운 비밀번호는 현재 비밀번호와 같을 수 없습니다.");
        }

        // 4. 새로운 비밀번호로 업데이트 (⭐️ 암호화 없이 평문 그대로 저장)
        member.setMem_password(changePasswordDTO.getNewPassword());
        
        // 변경사항 저장 및 DTO 변환하여 반환
        return convertToMemberDTO(this.memberRepository.save(member));
    }

    public MemberDTO setMemberUpdate(MemberDTO memberDTO){
        Member member = this.memberRepository.findByMemEmail(memberDTO.getMemEmail())
                                             .orElseThrow(() -> new ResourceNotFoundException("존재하지 않는 이메일입니다."));

        member.setMem_nickname(memberDTO.getMem_nickname());
        member.setMem_name(memberDTO.getMem_name());
        member.setMem_hp(memberDTO.getMem_hp());
        member.setMem_addr(memberDTO.getMem_addr());
        
        return convertToMemberDTO(this.memberRepository.save(member));
    }

    public MemberDTO setMemberDelete(MemberDTO memberDTO){
        Member member = this.memberRepository.findByMemEmail(memberDTO.getMemEmail())
                                             .orElseThrow(() -> new ResourceNotFoundException("존재하지 않는 이메일입니다."));
        
        member.setMem_deleted("Y");
        return convertToMemberDTO(this.memberRepository.save(member));
    }
}
