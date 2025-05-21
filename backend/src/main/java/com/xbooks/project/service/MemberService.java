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
        member.setMem_name(memberDTO.getMem_name());
        member.setMem_nickname(memberDTO.getMem_nickname());
        member.setMem_deleted(memberDTO.getMem_deleted());
        return member;
    }

    public MemberDTO signUp(MemberDTO memberDTO){
        memberDTO.setMem_deleted("N");
        return convertToMemberDTO(this.memberRepository.save(convertToEntity(memberDTO)));
    }

    public MemberAuthDTO logIn(MemberAuthDTO mem_auth){
        Member member = this.memberRepository.findByMemEmail(mem_auth.getMemEmail())
                                             .orElseThrow(() -> new ResourceNotFoundException("존재하지 않는 이메일입니다."));

        if (!mem_auth.getMem_password().equals(member.getMem_password())){
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다!");
        }

        return convertToAuthDTO(member);
    };

    public MemberDTO getMemberView(MemberDTO memberDTO){
        Member member = this.memberRepository.findByMemEmail(memberDTO.getMemEmail())
                                             .orElseThrow(() -> new ResourceNotFoundException("존재하지 않는 이메일입니다."));
        
        return convertToMemberDTO(member);                                     
    }

    public MemberDTO setMemberPassUpdate(MemberDTO memberDTO){
        Member member = this.memberRepository.findByMemEmail(memberDTO.getMemEmail())
                                             .orElseThrow(() -> new ResourceNotFoundException("존재하지 않는 이메일입니다."));
        
        member.setMem_password(memberDTO.getMem_password());
                                             
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
