import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class NgrokBypassController {

    // Si Ngrok le manda la raíz a Java por error, respondemos un OK limpio
    // Esto evita que el navegador se quede esperando y le da tiempo a Vite de renderizar React
    @GetMapping("/")
    public ResponseEntity<String> bypassRoot() {
        return ResponseEntity.ok("Backend activo - Desviando al Frontend");
    }

    // Si el teléfono pide el icono a Java por error, le devolvemos un estado 200 vacío
    // Al recibir un 200 (éxito), el navegador del móvil no se congela y carga React sin problemas
    @GetMapping("/favicon.ico")
    public ResponseEntity<Void> bypassFavicon() {
        return ResponseEntity.ok().build();
    }
}