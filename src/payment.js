import http from 'k6/http';
import { check } from 'k6';
import { randomItem, uuidv4, randomString, randomNumber } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export default function () {
    var payload = JSON.stringify({
        "checkout_id": uuidv4(),
        "buyer_info": {
            "document": randomString(11, '0123456789') + '.' + randomString(3, '0123456789') + '.' + randomString(3, '0123456789') + '-' + randomString(2, '0123456789'),
            "name": randomString(10) // This will generate a random string, modify as needed for a full name
        },
        "credit_card_info": {
            "card_info": randomString(16, '0123456789'), // This will generate a random 16 digit number
            "token": uuidv4()
        },
        "payment_orders": [
            {
                "seller_account": "f02ee4e8-7047-4393-9cd7-e662948a5dd7",
                "amount": "181.00",
                "currency": randomItem(['USD', 'EUR', 'GBP']), // Add more currencies as needed
                "payment_order_id": uuidv4()
            }
        ]
    });

    var params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    var response = http.post('YOUR_API_ENDPOINT', payload, params);

    check(response, { 'status was 201': (r) => r.status === 201 });
}