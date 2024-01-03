import {Component, OnInit} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {AuthenticatorComponent} from "../../tools/authenticator/authenticator.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatButtonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  ngOnInit(): void {
  }

  constructor(private loginSheet:MatBottomSheet) {
  }
  onGetStartedClick() {
    this.loginSheet.open(AuthenticatorComponent)

  }
}
