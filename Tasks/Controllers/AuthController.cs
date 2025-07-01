using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;

    public AuthController(
        UserManager<ApplicationUser> userManager,
        SignInManager<ApplicationUser> signInManager
    )
    {
        _userManager = userManager;
        _signInManager = signInManager;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto model)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var user = new ApplicationUser
        {
            UserName = model.Email,
            Email = model.Email,
            FullName = model.FullName,
        };

        var result = await _userManager.CreateAsync(user, model.Password);

        if (result.Succeeded)
        {
            return Ok(new { message = "Usuario registrado con exito" });
        }

        var errores = result.Errors.Select(e => e.Description).ToList();

        return BadRequest(new { message = "No se pudo registrar el usuario", errors = errores });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto model)
    {
        var result = await _signInManager.PasswordSignInAsync(
            model.Email,
            model.Password,
            false,
            false
        );
        if (result.Succeeded)
        {
            return Ok(new { message = "Login exitoso" });
        }
        return Unauthorized(new { message = "Correo o contraseña incorrectos" });
    }

    [HttpGet("perfil")]
    [Authorize]
    public async Task<IActionResult> Perfil()
    {
        // Obtener el email del usuario autenticado
        var email = User.Identity?.Name;

        if (string.IsNullOrEmpty(email))
            return Unauthorized(new { message = "No autenticado" });

        // Buscar el usuario en la base de datos
        var user = await _userManager.FindByEmailAsync(email);

        if (user == null)
            return Unauthorized(new { message = "Usuario no encontrado" });

        // Retornar email y fullName
        return Ok(new { email = user.Email, fullName = user.FullName });
    }

    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        await _signInManager.SignOutAsync();
        return Ok(new { message = "Sesión cerrada" });
    }
}
