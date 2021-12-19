import { Product } from "./../product.model";
import { Router, ActivatedRoute } from "@angular/router";
import { ProductService } from "./../product.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-product-update",
  templateUrl: "./product-update.component.html",
  styleUrls: ["./product-update.component.css"],
})
export class ProductUpdateComponent implements OnInit {
 
  public product: Product = {
    id: null,
    nome: null,
    email: null,
    cpf: null,
    dataDeNascimento: null,
    idade: null,
  };
  public formulario: FormGroup;
  public listaFormularios: FormGroup[] = [];


  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    public fb: FormBuilder
  ) { }


  ngOnInit(): void {
    this.CreateForms();
    this.getProducts();
  }

  getProducts(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    if (id) {
      this.productService.readById(id).subscribe((product) => {
        this.product = product;
        console.log('product', this.product);
        
        this.updateForm(this.product);
        console.log('formulario', this.formulario);
        
      });
    } else {  
      this.productService.showMessage('Não foi possível obter o produto!');
    }
  }

  public updateForm(product: Product): void {
    this.formulario.patchValue({
      id: product.id,
      nome: product.nome,
      email: product.email,
      cpf: product.cpf,
      dataDeNascimento: product.dataDeNascimento,
      idade: product.idade,
    });
    this.formulario.updateValueAndValidity();
  }



  cancel(): void {
    this.router.navigate(["/products"]);
  }

  save(): void {
    if (this.formulario.valid) {
      this.product = Object.assign({}, this.formulario.value);
      console.log('product', this.product);
      this.productService.update(this.product).subscribe(() => {
        this.productService.showMessage("Produto atualizado com sucesso!");
        this.router.navigate(["/products"]);
      });
    } else {
      this.productService.showMessage('Formulário inválido!')
    }
  }

  private CreateForms(): void {
    this.formCreateProduct();
    this.listaFormularios = [
      this.formulario
    ];
  }

  private formCreateProduct(): void {
    this.formulario = this.fb.group({
      id: [this.product.id],
      nome: [this.product.nome],
      email: [this.product.email],
      cpf: [this.product.cpf],
      dataDeNascimento: [this.product.dataDeNascimento],
      idade: [this.product.idade]
    });
  }

  public validarCpf(): void {
    var cpf = this.formulario.get('cpf').value;
    if (cpf == null) {
      this.productService.showMessage('CPF inválido!')
    } else {
      if (cpf.length != 11) {
        this.productService.showMessage('CPF inválido!')
      } else {
        var numeros = cpf.substring(0, 9);
        var digitos = cpf.substring(9);
        var soma = 0;
        var resto;
        var i;
        for (i = 10; i > 1; i--) {
          soma += numeros.charAt(10 - i) * i;
        }
        resto = (soma * 10) % 11;
        if (resto == 10 || resto == 11) {
          resto = 0;
        }
        if (resto != digitos.charAt(0)) {
          this.productService.showMessage('CPF inválido!')
        } else {
          var soma = 0;
          var resto;
          var i;
          numeros = cpf.substring(0, 10);
          for (i = 11; i > 1; i--) {
            soma += numeros.charAt(11 - i) * i;
          }
          resto = (soma * 10) % 11;
          if (resto == 10 || resto == 11) {
            resto = 0;
          }
          if (resto != digitos.charAt(1)) {
            this.productService.showMessage('CPF inválido!')
          }
        }
      }
    }
  }

  private calcularIdade(dataDeNascimento: Date): void {
    let dataAtual = new Date();
    let anoAtual = dataAtual.getFullYear();
    let mesAtual = dataAtual.getMonth();
    let diaAtual = dataAtual.getDate();
    dataDeNascimento = new Date(dataDeNascimento);
    let anoNascimento = dataDeNascimento.getFullYear();
    let mesNascimento = dataDeNascimento.getMonth();
    let diaNascimento = dataDeNascimento.getDate();
    let idade = anoAtual - anoNascimento;
    if (mesAtual < mesNascimento) {
      idade--;
    }
    if (mesAtual == mesNascimento && diaAtual < diaNascimento) {
      idade--;
    } 
    this.formulario.get('idade').setValue(idade);
  }

  public dateChange(dataDeNascimento: Date): void {
    this.calcularIdade(dataDeNascimento);
  }

  public getDataNascimentoFormatada(): string {
    return this.product.dataDeNascimento
      .substr(8, 2)
      .concat("/")
      .concat(this.product.dataDeNascimento.substr(5, 2))
      .concat("/")
      .concat(this.product.dataDeNascimento.substr(0, 4));
  }
}
