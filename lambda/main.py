def handler(event,context):
    response_body = {
        "message": "Hello wolrd",
        "version": "1.0.0"
    }
    return{"statusCode":200, "body":"Hello World!"}
