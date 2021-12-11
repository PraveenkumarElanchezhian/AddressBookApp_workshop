window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector('#name');
    name.addEventListener('input', function () {
      if (name.value.length == 0) {
        setTextValue('.text-error', "");
        return;
      }
      try {
        checkName(name.value);
        setTextValue('.text-error', "");
      }
      catch (e) {
        setTextValue('.text-error', e);
      }
    });


    const phonenumber = document.querySelector('#phonenumber');
    phonenumber.addEventListener('input', function () {
      if (phonenumber.value.length == 0) {
        setTextValue('.phonenumber-error', "");
        return;
      }
      try {
        checkPhoneNumber(phonenumber.value);
        setTextValue('.phonenumber-error', "");
      }
      catch (e) {
        setTextValue('.phonenumber-error', e);
      }
    });


    const address = document.querySelector('#address');
    address.addEventListener('input', function () {
      if (address.value.length == 0) {
        setTextValue('.address-error', "Invalid Address");
        return;
      }
      setTextValue('.address-error', "");
    });
});

    const checkName = (name) => {
        let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$');
        if (!nameRegex.test(name))
          throw "Name is Incorrect";
      }

      const setTextValue = (id, value) => {
        const element = document.querySelector(id);
        element.textContent = value;
      };
      
      const setValue = (id, value) => {
        const element = document.querySelector(id);
        element.value = value;
      };


      const checkPhoneNumber = (phoneNumber) => {
        let phoneNumberRegex = RegExp('([+][0-9]{2}[ ])?[1-9]{1}[0-9]{9}');
        if (!phoneNumberRegex.test(phoneNumber))
          throw "phonenumber is Incorrect";
      }
      