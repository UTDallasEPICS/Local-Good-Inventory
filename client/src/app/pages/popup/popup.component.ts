import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  
  popup = document.getElementById("popup");

  constructor() { }
  ngOnInit(): void {
    this.popup = document.getElementById("popup");
  }


  // openPopup(){
      // document.querySelector(".container")!.style.display= "flex";
  //     this.popup!.classList.add("open-popup");
  // } 

  // openPopup(){
  //     document.getElementById("popup")?.classList.toggle("active");
  // }

  closePopup(){
      this.popup!.classList.remove("open-popup");
      document.body.style.backgroundColor = ' transparent ';
  }

  //  const cancelPop = document.getElementById("close");

  //  cancelPop.addEventListener("click", CancelPopOut);

  //  CancelPopOut(e){
  //     e.preventDefault();
  //     document.querySelector(".popup").style.display="none";
  //  }
 

  // popOutNow(e){
  //   e.preventDefault();

  //   document.querySelector
  // }
  
  // const exitPopUP = document.getElementById("popup");
  // document.addEventListener("mouseout", exitPage);

  // exitPage(event: any)
  // {
  //     if (event.clientY < 50)
  //     {
  //         this.popup!.classList.add("open-popup");
  //     }
  // }

 }
