package com.xbooks.project.service;

import org.springframework.stereotype.Service;

import com.xbooks.project.dto.MemberAuthDTO;
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

    public MemberDTO convertToMemberDTO(Member member){
        return MemberDTO.builder()
                .mem_id(member.getMem_id())
                .mem_email(member.getMem_email())
                .mem_password(member.getMem_password())
                .mem_name(member.getMem_name())
                .mem_nickname(member.getMem_nickname())
                .mem_deleted(member.getMem_deleted())
                .build();
    }

    public Member convertToEntity(MemberDTO memberDTO){
        Member member = new Member();
        member.setMem_id(memberDTO.getMem_id());
        member.setMem_email(memberDTO.getMem_email());
        member.setMem_password(memberDTO.getMem_password());
        member.setMem_name(memberDTO.getMem_name());
        member.setMem_nickname(memberDTO.getMem_nickname());
        member.setMem_deleted(memberDTO.getMem_deleted());
        return member;
    }

    public MemberDTO signUp(MemberDTO memberDTO){
        return convertToMemberDTO(this.memberRepository.save(convertToEntity(memberDTO)));
    }

    public MemberAuthDTO logIn(MemberAuthDTO mem_auth){
        Member member = this.memberRepository.findById(mem_auth.getMem_id())
                                             .orElseThrow(() -> new ResourceNotFoundException("존재하지 않는 아이디입니다."));

        if (!mem_auth.getMem_password().equals(member.getMem_password())){
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다!");
        }

        return convertToAuthDTO(member);
    };

    public MemberDTO setMemberUpdate(MemberDTO memberDTO){
        Member member = this.memberRepository.findById(memberDTO.getMem_id())
                                             .orElseThrow(() -> new ResourceNotFoundException("존재하지 않는 아이디입니다."));
        
        member.setMem_password(memberDTO.getMem_password());
        member.setMem_nickname(memberDTO.getMem_nickname());
                                             
        return convertToMemberDTO(this.memberRepository.save(member));                                     
    }

    public void setMemberDelete(String mem_id){
        Member member = this.memberRepository.findById(mem_id)
                                             .orElseThrow(() -> new ResourceNotFoundException("존재하지 않는 아이디입니다."));
        this.memberRepository.delete(member);
    }
}
