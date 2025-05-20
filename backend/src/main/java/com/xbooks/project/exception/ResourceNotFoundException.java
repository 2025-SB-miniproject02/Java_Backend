package com.xbooks.project.exception;

public class ResourceNotFoundException extends RuntimeException{
    // 생성자 메소드 정의하기
    //  - 예외를 처리하는 곳에서 생성시킨 후 예외 메시지를 넘겨주도록 처리
    public ResourceNotFoundException(String message){
        // 부모 클래스에 메시지 전달하기
        //  - 부모 예외 클래스가 처리해 줌
        super(message);
    }
}