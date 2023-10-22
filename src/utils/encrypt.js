import crypto from 'crypto'
import { Base64 } from 'js-base64'

const publicKey = '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAoCexZpVzZaKNjUYw7Q2hGp5d8jM688bJUUJiL+TVfz9aGbIpSUC1i9BKMMPPsU/S9kmMpjNLEO7pchoGeDEglPW5nHKmK6LWY7NuhZlStwrMERa9zsbu9gALxtOkLkmlIlvws8OQOJGIChb45yBBRb+k8WW1gtm7OpL5n05jc01AeMmEkk0U3l2Vogv4BHKCcsIqE7FMxfF7sEwyKqnQuJl93BvdV4tpU0nZZny8VlVZ/gOG5gGaaR43yYBRtXdkKOalTxUhai22o6s/QXkPaMtcLmMsaq+EmcQm3hwuHDlyNSo4YJT4rPYyfhH0QZ3scqio1iqbwumQH3KtXxXGewIDAQAB\n-----END PUBLIC KEY-----'
const privateKey = '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCgJ7FmlXNloo2NRjDtDaEanl3yMzrzxslRQmIv5NV/P1oZsilJQLWL0Eoww8+xT9L2SYymM0sQ7ulyGgZ4MSCU9bmccqYrotZjs26FmVK3CswRFr3Oxu72AAvG06QuSaUiW/Czw5A4kYgKFvjnIEFFv6TxZbWC2bs6kvmfTmNzTUB4yYSSTRTeXZWiC/gEcoJywioTsUzF8XuwTDIqqdC4mX3cG91Xi2lTSdlmfLxWVVn+A4bmAZppHjfJgFG1d2Qo5qVPFSFqLbajqz9BeQ9oy1wuYyxqr4SZxCbeHC4cOXI1KjhglPis9jJ+EfRBnexyqKjWKpvC6ZAfcq1fFcZ7AgMBAAECggEAOF/gfUisNyFyDEGh5T+/7tvCHAhWfwsBQF5Kq6s0T7dgIt1o1QU3IoDuLJ4wlKyRiOo43SP/D3XZrLVmg5Zfbq/UZzKgNYn7R1sY02Q2DoJ5dKZ5p7i00tkPTCyhhT2dKCwO3WhAcvkfVtXhRZJAB6o/CE4SB35W/nZP8fio3yPKmsvV/xwb7FHFRPiIb0oAaauZdXnnu5rx9AEL3HZDIK0nDejWD8MqfsHAUnDO0FF7UO+bWsSJ34ECbCw++h6pSo+MNuC4u8jnwZT4NKo6QBSArR+IiUB/zHyEMj8XT5RvOd/SdL19goG7K2SYyhu7TV8NUW3tV5OMWo9Y4RE+WQKBgQDTCMn54cpzerWBZTbCgOu2HG7GnIHwJ2YKteQNCNkqHjb4PCd5VxaXneMqR8nSaSZLPp5g7MKnVEITXVuGqwzjkzTOorcLNvGQw8QjvF7NoqX9pek7ArIrnUuqXFOIgRx/xcHQajKrHXr5dn4TxcwqCWQhSbEdWbEeuBhgMHzwHwKBgQDCR5xeb0e0SHBMW9coWsMMQqlVoGgnl2yEu0wgUkZftD/KeIcYXjxaoxlkPtAEzWjPqrX84HHpXvqjVqQhlU/XpoUNkO+kI1kMzP8L4IQaOGp+/xSNW1PQ5BkLGMeH75CuaAFo6/Eyt22qaGFwN5aeQWzN8ZPzsO5ysJYLK+6uJQKBgESP2m7guJGEEGwVohDXKb1kx2ineF+5rSFVrt29PjC82EcV5A08Cg8AMMmPwTYnC1Xu5i2/Pg53BXCdKBs8f1eAf+uSWb2/AAR0Vcj2biaI7TzXJksRuSkKVYbnsAvtRoEMksdPeV62mTlrEdMCtC4EFw/pjS1n8m90iBbYKf8pAoGAJ2yGs7cbMt9cQnKEl8DLQcqpOCID4LzenZSwXwKzGyqloz2QFIbS8oWUWn5QkhjowvNeWMFm/Dd03v5u8g2tlRJKf7VAm+s8X9edjdhyliuKmNjEX+b/fC09U74kh1Y64tliJ9txJ5yHWYQy+aWeH+Eg5i22m0X1LTreR8gTeC0CgYEAgTevdNXVcX9xhSgUOOJpK9+mmG83DSEGpFfiPzmXL1GcOj2RILMGrScvrssaOV27MSXoMM6l4sJhiP3JZIFJ0OjPshlIEYh/95l2DrtcCeAcc3rTwz4gi8J3Z5QTRXBSa6GOWlpBFxKrsNdQ35nCIQfx9/S6OuTLX+U2pu4mZ+Y=\n-----END PRIVATE KEY-----'

export const encryptNote = note => {
    const buffer = Buffer.from(note, 'utf-8')

    return crypto
        .publicEncrypt({key: publicKey, padding: crypto.RSA_PKCS1_PADDING}, buffer)
        .toString('base64')
}

export const decryptNote = encryptNote => {
    const decryptNote = crypto.privateDecrypt({key: privateKey, padding: crypto.RSA_PKCS1_PADDING},
        Buffer.from(encryptNote, 'base64'))

    return decryptNote.toString('utf-8')
}