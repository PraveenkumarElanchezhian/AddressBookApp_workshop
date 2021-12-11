let isUpdate = false;
let addressBookDataObject = {};
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


      const save = (event) => {
        event.preventDefault();
        event.stopPropagation();
        try {
          setAddressBookObject();
          createAndUpdateStorage();
          resetForm();
          window.location.replace(site_properties.home_page);
        }
        catch (e) {
          alert(e);
        }
      };


      const setAddressBookObject = () => {
        if(!isUpdate && site_properties.use_local_storage.match("true")){
          addressBookDataObject.id = createNewAddressBookIdId();
        }
        addressBookDataObject._firstname = getInputValueById('#name');
        addressBookDataObject._phonenumber = getSelectedValues('[name=phonenumber]').pop();
        addressBookDataObject._address = getSelectedValues('[name=address]').pop();
        addressBookDataObject._state = getSelectedValues('[name=State]');
        addressBookDataObject._city = getSelectedValues('[name=City]');
        addressBookDataObject._zipcode = getSelectedValues('[name=ZipCode]');
      };

      const createAndUpdateStorage = () => {
        let addressBookList = JSON.parse(localStorage.getItem("AddressBookList"));
        if (addressBookList) {
      
          let addressBookData = addressBookList.find(i => i.id == addressBookDataObject.id);
          if(!addressBookData) 
          addressBookList.push(addressBookDataObject);
          else{
            const index = addressBookList.map(i => i.id).indexOf(addressBookData.id);
            addressBookList.splice(index, 1, addressBookDataObject);
          }
        }
         else {
          addressBookList = [addressBookDataObject];
        }
        localStorage.setItem("AddressBookList", JSON.stringify(addressBookList));
      };

      const createNewAddressBookIdId = () => {
        let addressBookId = localStorage.getItem('AddressBookId');
        addressBookId = !addressBookId ? 1: (parseInt(addressBookId)+1).toString();
        localStorage.setItem('AddressBookId', addressBookId);
        return addressBookId;
      }

      const resetForm = () => {
        setValue('#name', '');
        unsetSelectedValues('[name=phonenumber]');
        unsetSelectedValues('[name=State]');
        unsetSelectedValues('[name=City]');
        unsetSelectedValues('[name=ZipCode]');
        unsetSelectedValues('[name=address]');
      };

      const unsetSelectedValues = (propertyValue) => {
        let allItems = document.querySelectorAll(propertyValue);
        allItems.forEach(item => {
          item.checked = false;
        });
      };
      
      