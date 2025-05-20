package com.xbooks.project.service;

import org.springframework.stereotype.Service;

import com.xbooks.project.dto.MemberAuthDTO;
import com.xbooks.project.dto.MemberSignUpDTO;
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
                .mem_id(member.getMem_id())
                .mem_password(member.getMem_password())
                .build();
    }

    public Member convertToEntity(MemberAuthDTO memberAuthDTO){
        Member member = new Member();
        member.setMem_id(memberAuthDTO.getMem_id());
        member.setMem_password(memberAuthDTO.getMem_password());
        return member;
    }

    public MemberSignUpDTO convertToSignUpDTO(Member member){
        return MemberSignUpDTO.builder()
                .mem_id(member.getMem_id())
                .mem_email(member.getMem_email())
                .mem_password(member.getMem_password())
                .mem_name(member.getMem_name())
                .mem_nickname(member.getMem_nickname())
                .mem_deleted(member.getMem_deleted())
                .build();
    }

    public Member convertToEntity(MemberSignUpDTO memberSignUpDTO){
        Member member = new Member();
        member.setMem_id(memberSignUpDTO.getMem_id());
        member.setMem_email(memberSignUpDTO.getMem_email());
        member.setMem_password(memberSignUpDTO.getMem_password());
        member.setMem_name(memberSignUpDTO.getMem_name());
        member.setMem_nickname(memberSignUpDTO.getMem_nickname());
        member.setMem_deleted(memberSignUpDTO.getMem_deleted());
        return member;
    }

    public MemberSignUpDTO signUp(MemberSignUpDTO mem_signUp){
        return convertToSignUpDTO(this.memberRepository.save(convertToEntity(mem_signUp)));
    }

    public MemberAuthDTO logIn(MemberAuthDTO mem_auth){
        Member member = this.memberRepository.findById(mem_auth.getMem_id())
                                             .orElseThrow(() -> new ResourceNotFoundException("존재하지 않는 아이디입니다."));

        if (!mem_auth.getMem_password().equals(member.getMem_password())){
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다!");
        }

        return convertToAuthDTO(member);
    };

    public void setMemberDelete(String mem_id){
        Member member = this.memberRepository.findById(mem_id)
                                             .orElseThrow(() -> new ResourceNotFoundException("존재하지 않는 아이디입니다."));
        this.memberRepository.delete(member);
    }
}
