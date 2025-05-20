package com.xbooks.project.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.xbooks.project.dto.MemberAuthDTO;
import com.xbooks.project.dto.MemberSignUpDTO;
import com.xbooks.project.service.MemberService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("member")
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;

    @PostMapping(path="/signup")
    public ResponseEntity<MemberSignUpDTO> signUp(@RequestBody MemberSignUpDTO memberSignUpDTO){
        return ResponseEntity.ok(this.memberService.signUp(memberSignUpDTO));
    }
    
    @PostMapping(path="/login")
    public ResponseEntity<MemberAuthDTO> logIn(@RequestBody MemberAuthDTO mem_auth){
        return ResponseEntity.ok(this.memberService.logIn(mem_auth));
    }

    @DeleteMapping(path="/delete/{mem_id}")
    public ResponseEntity<Void> setMemberDelete(@PathVariable("mem_id") String mem_id){
        this.memberService.setMemberDelete(mem_id);

        return ResponseEntity.noContent().build();
    }
}
