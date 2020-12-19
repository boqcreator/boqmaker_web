import { Component, OnInit } from "@angular/core";
import { ModalController } from '@ionic/angular';

@Component({
  selector: "app-shape-calculator",
  templateUrl: "./shape-calculator.page.html",
  styleUrls: ["./shape-calculator.page.scss"],
})
export class ShapeCalculatorPage implements OnInit {
  segment = "s1";
  areaResult;
  parameterResult;
  A = 0;
  B = 0;
  C = 0;
  D = 0;
  E = 0;
  G = 0;
  F = 0;
  AM = 0;
  H = 0;
  I = 0;
  J = 0;
  AN = 0;
  AO = 0;
  K = 0;
  L = 0;
  M = 0;
  N = 0;
  O = 0;
  P = 0;
  Q = 0;
  R = 0;
  S = 0;
  T = 0;
  U = 0;
  V = 0;
  W = 0;
  X = 0;
  Y = 0;
  Z = 0;
  AA = 0;
  AB = 0;
  AC = 0;
  AD = 0;
  AE = 0;
  AF = 0;
  AG = 0;
  AH = 0;
  AK = 0;
  AI = 0;
  AL = 0;
  AJ = 0;
  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  onChangeShapeInput() {
    if (this.segment == "s1") {
      this.areaResult = this.A * this.A;
      this.parameterResult = 4 * this.A;
    } else if (this.segment == "s2") {
      this.areaResult = this.B * this.C;
      this.parameterResult = 2 * (this.B + this.C);
    } else if (this.segment == "s3") {
      this.areaResult = 0.5 * this.D * this.E;
      this.parameterResult =
        this.D + this.E + ((this.E * this.E + this.D * this.D) ^ 0.5);
    } else if (this.segment == "s4") {
      this.areaResult = 0.5 * this.F * this.G;
      this.parameterResult =
        this.F +
        0.5 * ((this.G * this.G + this.AM * this.M) ^ 0.5) +
        ((this.G * this.G + (this.F - this.AM) * (this.F - this.AM)) ^ 0.5);
    } else if (this.segment == "s5") {
      this.areaResult = 0.5 * this.J * (this.H + this.I);
      this.parameterResult =
        this.H +
        this.I +
        ((this.J * this.J + this.AN * this.AN) ^ 0.5) +
        ((this.J * this.J + this.AO * this.AO) ^ 0.5);
    } else if (this.segment == "s6") {
      this.areaResult = this.K * this.P + this.N * this.M;
      this.parameterResult =
        this.K + this.L + this.M + this.N + this.O + this.P;
    } else if (this.segment == "s7") {
      this.areaResult =
        this.Q * this.R +
        this.W * this.T +
        (this.V - this.U) * (this.T - this.S);
      this.parameterResult =
        this.Q + this.R + this.S + this.T + this.U + this.V + this.W + this.X;
    } else if (this.segment == "s8") {
      this.areaResult = this.Z * this.Y + 0.786 * this.Y * this.Y;
      this.parameterResult = 1.572 * this.Y + 2 * this.Z;
    } else if (this.segment == "s9") {
      this.areaResult = this.AB * this.AB + 1.572 * this.AA * this.AA;
      this.parameterResult = 3.143 * this.AA + 2 * this.AB;
    } else if (this.segment == "s10") {
      this.areaResult =
        this.AC * this.AF +
        this.AG * this.AE +
        0.5 * (this.AE + this.AC - this.AD) * (this.AH - this.AG + this.AF);
      this.parameterResult =
        (this.AC +
          this.AF +
          this.AD +
          this.AG +
          this.AE +
          this.AH +
          ((this.AH - (this.AF + this.AG)) ^
            (2 + (this.AC - (this.AD + this.AE))) ^
            2)) ^
        0.5;
    } else if (this.segment == "s11") {
      this.areaResult =
        this.AK * this.AI + 0.5 * (this.AJ + this.AI) * (this.AL - this.AK);
      this.parameterResult =
        (this.AI +
          this.AL +
          this.AJ +
          this.AK +
          ((this.AI - this.AJ) ^ (2 + (this.AL - this.AK)) ^ 2)) ^
        0.5;
    }
  }

  onSubmit(){
    this.modalController.dismiss({
      area : this.areaResult,
      para: this.parameterResult
    })
   }
 
   close(){
     this.modalController.dismiss()
       }
}
