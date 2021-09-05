import axios from "axios";

describe('TEST', () => {

  test('getCurrentUser', async () => {
    const response = await axios.get('https://jogtracker.herokuapp.com/api/v1/auth/user',
      {
        headers: {
          Authorization: 'Bearer eb8cdf9e61521369da24ab55f0095f5da870881990d9b75daefef50333178daf'
        }
      }
    )
    expect(response.data.response).toEqual({
      "id": "3",
      "email": "karolina@mail.ru",
      "phone": "65",
      "role": "admin",
      "first_name": "55",
      "last_name": "321"
    })
  });

  test('accessCheck', async () => {
    try {
      const response = await axios.get('https://jogtracker.herokuapp.com/api/v1/auth/user')
    } catch (e) {
      expect(e.response.data.error_message).toEqual({
        "error": "The access token is invalid"
      })
    }
  })



  test('addJog', async () => {

      const response = await axios.post('https://jogtracker.herokuapp.com/api/v1/data/jog', {
          date: '12.12.2020',
          time: 232332,
          distance: 322323
        },
        {
          headers: {
            Authorization: 'Bearer eb8cdf9e61521369da24ab55f0095f5da870881990d9b75daefef50333178daf'
          }}
      )
    expect(response.data.response.time).toBe(232332)
    expect(response.data.response.distance).toBe(322323)
  })

  test('getJogs', async () => {

    const response = await axios.get('https://jogtracker.herokuapp.com/api/v1/data/sync',
      {
        headers: {
          Authorization: 'Bearer eb8cdf9e61521369da24ab55f0095f5da870881990d9b75daefef50333178daf',
        }
      }
    )
      expect(Array.isArray(response.data.response.jogs)).toBe(true)
  })


  test('getToken', async () => {

    const response = await axios.post('https://jogtracker.herokuapp.com/api/v1/auth/uuidLogin',
      {uuid: 'Hello'},
      {
        headers: {
          Authorization: 'Bearer eb8cdf9e61521369da24ab55f0095f5da870881990d9b75daefef50333178daf',
        }
      })
    expect(typeof response.data.response.access_token).toBe('string')
    expect(response.data.response.token_type).toBe("bearer")
  })

})