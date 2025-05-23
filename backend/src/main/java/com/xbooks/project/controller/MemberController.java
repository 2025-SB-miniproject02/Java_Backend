package com.xbooks.project.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.xbooks.project.dto.MemberAuthDTO;
import com.xbooks.project.dto.MemberChangePasswordDTO;
import com.xbooks.project.dto.MemberDTO;
import com.xbooks.project.exception.ResourceNotFoundException;
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

    // 회원 복구
    @PutMapping(path="/recover/{memEmail}")
    public ResponseEntity<MemberDTO> recoverAccount(@PathVariable String memEmail) {
        return ResponseEntity.ok(this.memberService.recoverAccount(memEmail));
    }

    // 마이 페이지
    @GetMapping(path="/my_pages")
    public ResponseEntity<MemberDTO> getMemberView(@RequestParam String memEmail){
        return ResponseEntity.ok(this.memberService.getMemberView(memEmail));
    }

    // 회원 비밀번호 변경
    @PutMapping(path="/change-password")
    public ResponseEntity<String> changePassword(@RequestBody MemberChangePasswordDTO changePasswordDTO) {
        try {
            // Service 메서드 호출
            memberService.changeMemberPassword(changePasswordDTO);
            return ResponseEntity.ok("비밀번호가 성공적으로 변경되었습니다.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("비밀번호 변경 중 오류가 발생했습니다.");
        }
    }

    @PutMapping(path="/update2")
    public ResponseEntity<MemberDTO> setMemberUpdate(@RequestBody MemberDTO memberDTO){
        return ResponseEntity.ok(this.memberService.setMemberUpdate(memberDTO));
    }

    // 회원 탈퇴
    @PutMapping(path="/delete/{mem_id}")
    public ResponseEntity<MemberDTO> setMemberDelete(@RequestBody MemberDTO memberDTO){
        return ResponseEntity.ok(this.memberService.setMemberDelete(memberDTO));
    }
}
