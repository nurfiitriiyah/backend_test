var knex = require('../../config/knex');
var moment = require('moment')
var Fakerator = require("fakerator");
var fakerator = Fakerator("de-DE");
var validator = require('validator');

async function transactionShowAllData() {
    try {
        var singleItems = 10000;
        var check_table = await knex.schema.hasTable("tb_transaction").then(async function (exists) {
            if (!exists) {
                var createTable = await knex.schema.createTable("tb_transaction", async function (t) {
                    t.string('transaction_id', 255);
                    t.string('transaction_first_name', 255);
                    t.string('transaction_last_name', 255);
                    t.string('transaction_email', 255);
                    t.string('transaction_item', 11);
                    t.integer('transaction_quantity', 11);
                    t.decimal('transaction_total_price', 20, 2);
                });
                for (var i = 0; i < 10; i++) {
                    let rand = Math.floor(Math.random() * Math.floor(1000));
                    var gen_id = moment().format("YYYYMMDDHHmmssx") + rand;
                    var gen_first_name = fakerator.names.firstName();
                    var gen_last_name = fakerator.names.lastName();
                    var gen_email = gen_first_name + gen_last_name + "@" + "skipper.cn";
                    var gen_item = "Item" + parseInt(rand * (1 / 100));
                    var gen_quantity = parseInt(rand * (1 / 10));
                    var gen_total_price = gen_quantity * singleItems;
                    var insertData = {
                        transaction_id: gen_id
                        , transaction_first_name: gen_first_name
                        , transaction_last_name: gen_last_name
                        , transaction_email: gen_email
                        , transaction_item: gen_item
                        , transaction_quantity: gen_quantity
                        , transaction_total_price: gen_total_price
                    }
                    var insert_transaction = await knex('tb_transaction').insert(insertData);
                }
            }
        });
        var showData = await knex.select("*").from("tb_transaction")
        return showData
    } catch (e) {
        console.log(e)
    }

}

async function pivotMe() {
    try {

        var prep_items = [];
        var prep_items_body = [];
        var prep_coulomn_array_header = [];
        var prep_coulomn_array = [];
        var tempAllResult = [];

        var find_data = await knex.select('*').from('tb_transaction')
        prep_items.push("Full Name")
        prep_items.push("Email")
        find_data.forEach(function (val, key) {
            prep_items.push(val.transaction_item)
            prep_items_body.push(val.transaction_item)
        })
        prep_items_body.sort()
        prep_items.sort()

        for (var i = 0; i < (prep_items.length); i++) {
            if ((prep_items[i] !== prep_items[i - 1])) {
                prep_coulomn_array_header.push(prep_items[i])
            }
        }

        for (var i = 0; i < (prep_items_body.length); i++) {
            if (prep_items_body[i - 1] === undefined || prep_items_body[i] !== prep_items_body[i - 1]) {
                prep_coulomn_array.push(prep_items_body[i])
            }
        }

        for (var i = 0; i < find_data.length; i++) {
            var tempResult = [];
            for (var k = 0; k < prep_coulomn_array.length; k++) {
                if (find_data[i].transaction_item === prep_coulomn_array[k]) {
                    tempResult.push(find_data[i].transaction_quantity)
                } else {
                    tempResult.push(0)
                }
            }
            tempAllResult.push({
                res_full_name: find_data[i].transaction_first_name + " " + find_data[i].transaction_last_name,
                res_email: find_data[i].transaction_email,
                data: tempResult
            })
            tempResult = []
        }
        return ({
            status: 'ok',
            data: {
                header: prep_coulomn_array_header,
                result: tempAllResult
            }
        })
    } catch (e) {
        return ({
            status: "nok",
            errorMessage: e
        })
    }
}

async function generateME() {
    try {
        let rand = Math.floor(Math.random() * Math.floor(1000));
        var gen_first_name = fakerator.names.firstName();
        var gen_last_name = fakerator.names.lastName();
        var gen_email = gen_first_name + gen_last_name + "@" + "skipper.cn";
        var gen_item = "Item" + parseInt(rand * (1 / 100));
        var gen_quantity = parseInt(rand * (1 / 10));
        var gen_total_price = gen_quantity * 10000;

        var res = {
            res_first_name: gen_first_name,
            res_last_name: gen_last_name,
            res_email: gen_email,
            res_item: gen_item,
            res_quantity: gen_quantity,
            res_total_price: gen_total_price,
        }
        return ({
            status: "ok",
            data: res
        })
    } catch (e) {
        console.log(e)
        return ({
            status: "nok",
            errorMessage: e
        })
    }
}

async function insertTransaction(data) {
    try {
        var validate_transaction = await validateTransaction(data)
        if(validate_transaction.valid === true){
            let rand = Math.floor(Math.random() * Math.floor(1000));
            var insertData = {
                transaction_id: moment().format("YYYYMMDDHHmmssx") + rand
                , transaction_first_name: data.post_first_name
                , transaction_last_name: data.post_last_name
                , transaction_email: data.post_email
                , transaction_item: data.post_item
                , transaction_quantity: data.post_quantity
                , transaction_total_price: data.post_total
            }
            var insert_transaction = await knex('tb_transaction').insert(insertData);
            return({
                status : "ok"
            })
        }else{
            return ({
                status: "nok",
                errorMessage: validate_transaction.message
            })
         }
    } catch (e) {
        return ({
            status: "nok",
            errorMessage: e
        })
    }
}

async function validateTransaction(data) {
    try {
        let valid = true;
        let message = [];
        if (validator.isEmpty(data.post_first_name)) {
            valid = false;
            message.push("First Name is Empty !")
        }
        if (validator.isEmpty(data.post_last_name)) {
            valid = false;
            message.push("Last Name is Empty !")
        }
        if (validator.isEmpty(data.post_email)) {
            valid = false;
            message.push("Email is Empty!")
        }
        if (validator.isEmpty(data.post_item)) {
            valid = false;
            message.push("Item is Empty!")
        }
        if (validator.isEmpty(data.post_quantity)) {
            valid = false;
            message.push("Quantity is Empty!")
        }

        return ({
            valid: valid,
            message: message
        })

    } catch (e) {
        return ({
            status: "nok",
            errorMessage: e
        })
    }
}


module.exports = {
    insertTransaction,
    generateME,
    pivotMe,
    transactionShowAllData
}