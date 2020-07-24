import { buildParams } from './utils'

describe('buildParams', () => {
  it('returns the original url when there is no data passed', () => {
    const result = buildParams('https://someurl.dev')

    expect(result.url).toEqual('https://someurl.dev')

    expect(result.params).toEqual(undefined)
  })

  it('returns the original url when data is passed, but it does not match the url placeholders', () => {
    const result = buildParams('https://someurl.dev', {
      param1: 123,
      param2: 'some string'
    })

    expect(result.url).toEqual('https://someurl.dev')

    expect(result.params).toEqual('param1=123&param2=some string')
  })

  it('changes the original url when data is passed and matches the url placeholders, but it leaves the unmatched data as parameters', () => {
    const result = buildParams('https://someurl.dev/{{param1}}/text/{{param2}}', {
      param1: 123,
      param2: 'some string'
    })

    expect(result.url).toEqual('https://someurl.dev/123/text/some string')

    expect(result.params).toEqual(undefined)
  })

  it('changes the original url when data is passed and matches the url placeholders, but it leaves the unmatched data as parameters', () => {
    const result = buildParams('https://someurl.dev/{{param1}}', {
      param1: 123,
      param2: 'some string'
    })

    expect(result.url).toEqual('https://someurl.dev/123')

    expect(result.params).toEqual('param2=some string')
  })
})
