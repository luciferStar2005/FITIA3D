package com.example.back_end.error;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class ErrorMap {
    private LocalDateTime timestamp;
    private String mensaje;
    private String details;

    public ErrorMap(String mensaje, String details){
        this.timestamp=LocalDateTime.now();
        this.mensaje=mensaje;
        this.details=details;
    }
}
