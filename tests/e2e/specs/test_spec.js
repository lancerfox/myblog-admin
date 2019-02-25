// https://docs.cypress.io/api/introduction/api.html

describe('登录页-测试', () => {
  beforeEach(() => {
    cy.login('root01', 'a123456')
  })
  // it('不输入帐号和密码，显示错误提示！', () => {
  //   cy.visit('http://localhost:8080/#/login')
  //   cy.get('button').click()
  //   cy.get('.ivu-form-item-error-tip:eq(0)').contains('账号不能为空')
  //   cy.get('.ivu-form-item-error-tip:eq(1)').contains('密码不能为空')
  // })
  // it('只输入帐号，显示密码为空提示！', () => {
  //   cy.visit('http://localhost:8080/#/login')
  //   cy.get('#userName').type('root01')
  //   cy.get('button').click()
  //   cy.get('.ivu-form-item-error-tip:eq(0)').contains('密码不能为空')
  // })
  // it('帐号或密码错误提示！', () => {
  //   cy.visit('http://localhost:8080/#/login')
  //   cy.get('#userName').type('root01')
  //   cy.get('#password').type('a12345')
  //   cy.get('button').click()
  //   cy.wait(1000)
  //   cy.get('.login-tip').contains('帐号或密码错误，请重新输入')
  // })

  it('帐号和密码正确，成功登录！', () => {
    // cy.visit('http://localhost:8080/#/login')
    // cy.get('#userName').type('root01')
    // cy.get('#password').type('a123456')
    // cy.server()
    // cy.route({
    //   method: 'POST',
    //   url: 'http://localhost:8080/api/v1/user/login'
    // }).as('login')
    // cy.get('button').click()

    // cy.wait('@login').then(res => {
    //   expect(res.response.body.error).to.eq(0)
    // })
    cy.get('.ivu-menu >.ivu-menu-item:eq(0)').click()
    cy.get('.ivu-table-row').should('have.length.least', 1)
    cy.get(
      'div.showtable-area > div > div > div.ivu-table-body > table > tbody > tr:nth-child(1) > td.ivu-table-column-center > div > div > button.ivu-btn.ivu-btn-primary.ivu-btn-small'
    ).click()
  })
})
