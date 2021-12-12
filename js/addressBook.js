class AddressBookData{

    id;

    get firstname(){
        return this._firstname;
    }
    set firstname(firstname){
        let Regex_firstname = RegExp('^[A-Z]{1}[a-zA-Z\\s]{3,}$');
        if(Regex_firstname.test(firstname))
            this._firstname = firstname;
        else
            throw 'Given firstname is Incorrect';
    }
    get phonenumber(){
        return this._phonenumber;
    }
    set phonenumber(){
        let Regex_phonenumber = RegExp('([+][0-9]{2}[ ])?[1-9]{1}[0-9]{9}');
        if(Regex_phonenumber.test(phonenumber))
            this._phonenumber = this.phonenumber;
        else
            throw 'Given phonenumber is Incorrect';
    }
    get address(){
        return this._address;
    }
    set address(){
        let Regex_address = RegExp('^([A-z]{1}[a-z]{2,})( [A-z]{1}[a-z]{2,})?$');
        if(Regex_address.test(address))
            this._address = this.address;
        else
            throw 'Given address is incorrect';
    }
    get state() {
        return this._state;
    }
    set state(state) {
        this._state = state;
    }
    get city() {
        return this._city;
    }
    set city(city) {
        this._city = city;
    }
    get zipcode() {
        return this._zipcode;
    }
    set zipcode(zipcode) {
        this._zipcode = zipcode;
    }
    tostring(){
        return "Id = " + this.id + " fullName = " + this.firstname + " phonenumber = " +this.phonenumber + " address = "+ this.address + " city = "+this.city+ " state = "+this.state+" ZipCode = "+this.zipcode;
    }
    
}
