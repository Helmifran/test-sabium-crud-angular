import { Product } from './../product.model';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  public formulario: FormGroup;
  public listaFormularios: FormGroup[] = [];

  product: Product = {
    id: null,
    nome: null,
    email: null,
    cpf: null,
    dataDeNascimento: null,
    idade: null
  }

  constructor(private productService: ProductService,
      private router: Router,
      private fb: FormBuilder) { }

  ngOnInit(): void {
    this.CreateForms();
    // this.validarFormulario();
  }

  private formCreateProduct(): void {
    this.formulario = this.fb.group({
      id: [this.product.id],
      nome: [this.product.nome],
      email: [this.product.email],
      cpf: [this.product.cpf],
      dataDeNascimento: [this.product.dataDeNascimento],
      idade: [this.product.idade, [Validators.required]], 
    });
    this.formulario.get('idade').disable();
  }

  private CreateForms(): void {
    this.formCreateProduct();
    this.listaFormularios = [
      this.formulario
    ];
  }

  public save(): void {
    if (this.formulario.valid) {
      this.product = Object.assign({}, this.formulario.value);
      console.log('product', this.product);
      
      this.productService.create(this.product).subscribe(() => {
        this.productService.showMessage('Produto criado!')
        this.router.navigate(['/products'])
      })
    } else {
      this.productService.showMessage('Formulário inválido!')
    }
  }

  public cancel(): void {
    this.router.navigate(['/products'])
  }

  public validarCpf(): void {
    let cpf = this.formulario.get('cpf').value;
    if (cpf == null) {
      this.productService.showMessage('CPF inválido!')
    } else {
      if (cpf.length != 11) {
        this.productService.showMessage('CPF inválido!')
      } else {
        let numeros = cpf.substring(0, 9);
        let digitos = cpf.substring(9);
        let soma = 0;
        let resto;
        let i;
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
          let soma = 0;
          let resto;
          let i;
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
    this.validarIdade();
  }

  //validar se a idade é maior que 18 anos
  public validarIdade(): void {
    let idade = this.formulario.get('idade').value;
    if (idade < 18) {
      this.productService.showMessage('Idade inválida!', true);
      this.formulario.get('idade').setValue(null);
    } else {
      this.productService.showMessage('Idade válida!', false);
    }
  }

  //Se o formulário estiver inválido desabilitar botão de “salvar” e exibir mensagem de erro na tela 
  public validarFormulario(): void {
    if (this.formulario.invalid) {
      this.productService.showMessage('Formulário inválido!', true);
    } else {
      this.productService.showMessage('Formulário válido!', false);
    }
  }


}
