import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { Order } from 'src/app/shared/models/order';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit {

  order: Order = new Order();
  checkoutForm!: FormGroup;
  constructor(cartService:CartService,
    private formBuilder: FormBuilder,
    private userService: UserService, // we want the UserService to have default name and address of the User so it is set to private
    private toastrService: ToastrService,
    // private orderService: OrderService,
    // private router: Router
  ) {
    const cart = cartService.getCart(); // we want the latest vslue of the Cart and do not need an Observable here
    this.order.items = cart.items;
    this.order.totalPrice = cart.totalPrice;
  }

  ngOnInit(): void {
    let {name, address} = this.userService.currentUser;// the initial value of the form shold not be empty as have the name and address of the user
    this.checkoutForm = this.formBuilder.group({ // creating the form
      name:[name, Validators.required],
      address:[address, Validators.required]
    });
  }

  get fc(){ // getting the form controls
    return this.checkoutForm.controls;
  }

  createOrder(){
    if(this.checkoutForm.invalid){
      this.toastrService.warning('Fill the Inputs', 'Invalid Inputs');
      return;
    }

    // if(!this.order.addressLatLng){
    //   this.toastrService.warning('Please select your location on the map', 'Location');
    //   return;
    // }

    // setting the value of name and address of the user in the form
    this.order.name = this.fc['name'].value;
    this.order.address = this.fc['address'].value;

    // this.orderService.create(this.order).subscribe({
    //   next:() => {
    //     this.router.navigateByUrl('/payment');
    //   },
    //   error:(errorResponse) => {
    //     this.toastrService.error(errorResponse.error, 'Cart');
    //   }
    // })
  }

}
