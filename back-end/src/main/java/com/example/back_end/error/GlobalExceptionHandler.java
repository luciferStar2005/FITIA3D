package com.example.back_end.error;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import jakarta.persistence.EntityNotFoundException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    //404
    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ErrorMap> manageRuntime(EntityNotFoundException e, WebRequest rq){
        ErrorMap error=new ErrorMap(e.getMessage(), rq.getDescription(false) );
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    //403
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorMap> manejarAccesoDenegado(AccessDeniedException ex, WebRequest request) {
        ErrorMap error = new ErrorMap("you dont have acces", request.getDescription(false));
        return new ResponseEntity<>(error, HttpStatus.FORBIDDEN);
    }
}