package com.xbooks.project.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.xbooks.project.dto.MemberAuthDTO;
import com.xbooks.project.dto.MemberDTO;
import com.xbooks.project.service.MemberService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("member")
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;

    // 회원가입
    @PostMapping(path="/signup")
    public ResponseEntity<MemberDTO> signUp(@RequestBody MemberDTO memberDTO){
        return ResponseEntity.ok(this.memberService.signUp(memberDTO));
    }
    
    // 로그인
    @PostMapping(path="/login")
    public ResponseEntity<MemberAuthDTO> logIn(@RequestBody MemberAuthDTO mem_auth){
        return ResponseEntity.ok(this.memberService.logIn(mem_auth));
    }

    // 회원정보 수정
    @PutMapping(path="/update")
    public ResponseEntity<MemberDTO> setMemberUpdate(@RequestBody MemberDTO memberDTO){
        return ResponseEntity.ok(this.memberService.setMemberUpdate(memberDTO));
    }

    // 회원 삭제
    @DeleteMapping(path="/delete/{mem_id}")
    public ResponseEntity<Void> setMemberDelete(@PathVariable("mem_id") String mem_id){
        this.memberService.setMemberDelete(mem_id);

        return ResponseEntity.noContent().build();
    }
}
