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

    checkForUpdate();
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

      const cancel = (event) => {
        window.location.replace(site_properties.home_page);

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
        addressBookDataObject._phonenumber = getInputValueById("#phonenumber");
        addressBookDataObject._address = getInputValueById("#address");
        addressBookDataObject._state = getSelectedValues('[name=State]');
        addressBookDataObject._city = getSelectedValues('[name=City]');
        addressBookDataObject._zipcode = getInputValueById('#ZipCode');
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

     

      const unsetSelectedValues = (propertyValue) => {
        let allItems = document.querySelectorAll(propertyValue);
        allItems.forEach(item => {
          item.selectedIndex = 0;
        });
      };

      const getInputValueById = (id) => {
        let value = document.querySelector(id).value;
        return value;
      };

      const getSelectedValues = (propertyValue) => {
        let allItems = document.querySelectorAll(propertyValue);
        let selItems = [];
        allItems.forEach((item) => {
          selItems.push(item.options[item.selectedIndex].text);
        });
        return selItems;
      };

      const setForm = () => {
        setValue('#name', addressBookDataObject._firstname);
        setValue('#phonenumber', addressBookDataObject._phonenumber);
        setValue('#address', addressBookDataObject._address);
        setSelectedValues('[name=State]', addressBookDataObject._state);
        setSelectedValues('[name=City]', addressBookDataObject._city);
        setValue('#ZipCode', addressBookDataObject._zipcode);
      };

      const checkForUpdate = () => {
        const employeePayrollDataJson = localStorage.getItem('editEmp');
        isUpdate = employeePayrollDataJson ? true : false;
        if (!isUpdate)
          return;
          addressBookDataObject = JSON.parse(employeePayrollDataJson);
        setForm();
      };

      const setSelectedValues = (propertyValue, value) => {
        let allItems = document.querySelectorAll(propertyValue);
        allItems.forEach((item) => {
          item.options[item.selectedIndex].text=value;
        });
      };
      
      const resetForm = () => {
        setValue('#name', '');
        setValue('#phonenumber', '');
        setValue('#address', '');
        setValue('#ZipCode', '');
        unsetSelectedValues('[name=State]');
        unsetSelectedValues('[name=City]');
      };
      