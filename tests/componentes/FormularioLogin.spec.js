import { render, screen, fireEvent } from "@testing-library/react";
import FormularioLogin from "@/components/tienda/FormularioLogin";

describe("FormularioLogin (estado)", () => {
  it("actualiza el estado de los campos cuando el usuario escribe", () => {
    render(<FormularioLogin onEntrar={() => true} />);
    const correo = screen.getByLabelText("Correo");
    const clave = screen.getByLabelText("Contraseña");

    fireEvent.change(correo, { target: { value: "admin@duoc.cl" } });
    fireEvent.change(clave, { target: { value: "admin123" } });

    expect(correo.value).toBe("admin@duoc.cl");
    expect(clave.value).toBe("admin123");
  });

  it("muestra un error y no llama a onEntrar si el correo no es válido", () => {
    const onEntrar = jasmine.createSpy("onEntrar");
    render(<FormularioLogin onEntrar={onEntrar} />);

    fireEvent.change(screen.getByLabelText("Correo"), { target: { value: "admin@hotmail.com" } });
    fireEvent.change(screen.getByLabelText("Contraseña"), { target: { value: "admin123" } });
    fireEvent.click(screen.getByRole("button", { name: "Iniciar sesión" }));

    expect(onEntrar).not.toHaveBeenCalled();
    expect(screen.getByRole("alert").textContent).toContain("correo válido");
  });

  it("llama a onEntrar con el correo y la clave escritos", () => {
    const servicioSesion = jasmine.createSpyObj("ServicioSesion", ["entrar"]);
    servicioSesion.entrar.and.returnValue(true);
    render(<FormularioLogin onEntrar={servicioSesion.entrar} />);

    fireEvent.change(screen.getByLabelText("Correo"), { target: { value: "admin@duoc.cl" } });
    fireEvent.change(screen.getByLabelText("Contraseña"), { target: { value: "admin123" } });
    fireEvent.click(screen.getByRole("button", { name: "Iniciar sesión" }));

    expect(servicioSesion.entrar).toHaveBeenCalledWith("admin@duoc.cl", "admin123");
    expect(screen.queryByRole("alert")).toBeNull();
  });

  it("muestra 'incorrectos' cuando onEntrar responde false", async () => {
    const onEntrar = jasmine.createSpy("onEntrar").and.returnValue(false);
    render(<FormularioLogin onEntrar={onEntrar} />);

    fireEvent.change(screen.getByLabelText("Correo"), { target: { value: "admin@duoc.cl" } });
    fireEvent.change(screen.getByLabelText("Contraseña"), { target: { value: "otra" } });
    fireEvent.click(screen.getByRole("button", { name: "Iniciar sesión" }));

    expect((await screen.findByRole("alert")).textContent).toBe("Correo o contraseña incorrectos.");
  });
});
