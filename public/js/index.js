$(function () {
    /* Global Variables
    ====================================== */
    const $productsDisplayList = $("div#myProducts");
    const $createUserForm = $("form#createUser");
    const $firstName = $("input#firstName");
    const $lastName = $("input#lastName");
    const $address = $("input#address");
    const $email = $("input#email");
    const $formCheckInput = $("li input.form-check-input");
    let selectedProducts = [];





    /* Functions
    ====================================== */

    //Create User
    function createUser(userObject, productArray) {

        console.log(userObject, productArray);

        (productArray.length === 0) ? 0 : productArray

        console.log(userObject, productArray);

        $.post('/api/adduser', { userObject, productArray }, (data, error) => {
            console.log(data, error);
        })


    }



    /* Events
    ====================================== */

    // On Form submit
    $(document).on("submit", function (event) {
        event.preventDefault();

        let userData = {
            firsName: $firstName.val().trim(),
            lastName: $lastName.val().trim(),
            address: $address.val().trim(),
            email: $email.val().trim()
        }

        createUser(userData, selectedProducts);
    });

    // When selecting a product
    $(document).on("click", $formCheckInput, function (event) {

        let _this = $(this);
        let isChecked = _this[0].activeElement.checked

        if (isChecked) {

            let checkedProductId = _this[0].activeElement.value;
            selectedProducts.push(checkedProductId);
        } else {

            let unCheckedProductId = _this[0].activeElement.value;
            const index = selectedProducts.indexOf(unCheckedProductId);

            if (index > -1) {
                selectedProducts.splice(index, 1);
            }
        }
    })


    /* API Calls
    ====================================== */

    // Get the list of all the produts 
    $.get('/api/products').then((products) => {

        let $ul = $("<ul>")
            .addClass("list-group list-group-flush");

        products.map((items) => {

            let $li = $("<li>")
                .addClass("list-group-item");

            let $input = $("<input>")
                .attr({
                    "data-id": items._id,
                    "type": "checkbox",
                    "name": items.productName,
                    "value": items._id
                })
                .addClass("form-check-input")
                .appendTo($li);

            let $label = $("<label>")
                .attr({
                    "for": "productName"
                })
                .addClass("form-check-label")
                .text(items.productName, " - ", items.price)
                .appendTo($li);

            $li.appendTo($ul);
        })

        $ul.appendTo($productsDisplayList);
    })

});