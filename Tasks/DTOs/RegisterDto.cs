using System.ComponentModel.DataAnnotations;

public class RegisterDto
{
    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    [MinLength(6, ErrorMessage = "La contraseña debe tener al menos 6 caracteres.")]
    public string Password { get; set; }

    [Required]
    [StringLength(100, ErrorMessage = "El nombre completo es demasiado largo.")]
    public string FullName { get; set; }
}
