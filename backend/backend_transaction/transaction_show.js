var knex = require('../../config/knex');
var moment = require('moment')
var Fakerator = require("fakerator");
var fakerator = Fakerator("de-DE");

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

module.exports = {
    transactionShowAllData
}