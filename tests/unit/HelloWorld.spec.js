import { expect } from 'chai'
import { mount,shallow,createLocalVue } from '@vue/test-utils'
// import Vue from 'vue';
import moxios from 'moxios'
import Vuex from 'vuex'
// import HelloWorld from '@/components/HelloWorld.vue'
import app from '@/App.vue';
import managerlist from '@/view/manager-group/manager-list.vue'
import child from '@/view/manager-group/addmanager.vue'
// describe('HelloWorld.vue', () => {
//   it('renders props.msg when passed', () => {
//     const msg = 'new message'
//     const wrapper = shallow(HelloWorld, {
//       propsData: { msg }
//     })
//     expect(wrapper.text()).to.include(msg)
//   })
// })
const localVue = createLocalVue()

localVue.use(Vuex)
let actions;
let store;
let fn = function fn(){

}
beforeEach(function () {
  actions = {
    getdataaa:fn
    // actionInput:fn()
  }
  store = new Vuex.Store({
    state: {},
    actions
  })
  // import and pass your custom axios instance to this method
  moxios.install()
})

afterEach(function () {
  // import and pass your custom axios instance to this method
  moxios.uninstall()
})

describe('manager-list.vue', () => {
  it('点击添加管理员按钮', (done) => {
   
    // const  appWrapper = mount(app);
    const wrapper = mount(managerlist,{ store, localVue });
    // const  childwrapper = mount(child);
    // const wrapper = shallow(managerlist);
    // childwrapper.setProps({
    //   modal:true
    // })
     wrapper.find('.myaddmanager').trigger('click');
    //  wrapper.vm.$nextTick(()=>{
    //   expect(wrapper.vm.isShowAddManageModal).to.equal(true);
      // console.log(wrapper.vm.userlist);
      // expect(wrapper.vm.userlist.error).to.equal('0');
    //   done();
    // })
    //  wrapper.vm.getuserList((res) => {
    //   expect(wrapper.vm.userlist).to.equal(res);
    // })
    expect(actions.getdataaa).toHaveBeenCalled();
    // setTimeout(()=>{
      // expect(wrapper.vm.userlist).to.be.equal(6);
    //   done();
    // },5000)
    // console.log(wrapper.vm. userlist)
    //   wrapper.vm.$nextTick(() => {
    //   expect(wrapper.vm.userlist).to.be.equal(6);
    //    done();
    // })
  //   moxios.stubRequest('/api/v1/users/userlist', {
  //     status: 200,
  //     response: {
  //         // title: 'Changed title',
  //         // body: 'Changed body'
  //     }
  // });

  // moxios.wait(function () {
  //   // expect(actions.getdataaa).toHaveBeenCalled()
  //   // expect(wrapper.vm.userlist.error).to.equal('0');
  //   done()
  // })
  // expect(wrapper.vm.userlist.error).to.equal('0');
    // wrapper.vm.getuserList();
    // setTimeout(()=>{
    //   try {
    //     let r = wrapper.vm.getuserList();
    //     // assert.strictEqual(r, 15);
    //     done();
    // } catch (err) {
    //     done(err);
    // }
    // },5000)
    //  expect(wrapper.vm.isShowAddManageModal).to.equal(true);
    //  expect(wrapper.find(child).vm.modal).to.equal(true);
    // setTimeout(() => {
    //   expect(childwrapper.find('.ivu-modal-header').text()).to.equal('操作');
    //   childwrapper.find('.ivu-modal-footer div button[0]').trigger('click');
    //   expect(childwrapper.find('.ivu-modal-body form div[0] .ivu-form-item-error-tip').text()).to.equal('请输入用户名');
    //   childwrapper.vm.setProps({
    //     formCustom:{
    //       userName: 'aaaa',
    //       password: ''
    //     }
    // })
    // expect(childwrapper.find('.ivu-modal-body form div[0] .ivu-form-item-error-tip').text()).to.equal('用户名只能输入5-20个以字母开头、可带数字、“_”、“.”的字符');
    //   childwrapper.find('.ivu-modal-footer div button[1]').trigger('click');
    //   expect(childwrapper.vm.modal).to.equal(false);
    //   done();
    // },1000)
    
    // wrapper.vm.$nextTick(()=>{
    //   expect(wrapper.vm.isShowAddManageModal).to.equal(true);
    //   console.log(wrapper.vm.userlist);
    //   // expect(wrapper.vm.userlist.error).to.equal('0');
    //   done();
    // })
    // expect(wrapper.text()).to.include('添加管理员')
    // console.log(childwrapper)
    // wrapper.find('.myaddmanager').trigger('click');
    // expect(wrapper.vm.isShowAddManageModal).to.equal(true);
    // ivu-modal
    // expect(wrapper.find(child).vm.modal).to.equal(true);
    // childwrapper.vm.$nextTick(() => {
      // expect(childwrapper.find('.ivu-modal-header').text()).to.equal('操作')
      // done();
  // })

    
    // ivu-modal-header
    // expect(wrapper.vm.quantity).toBe(0)
    // expect(wrapper.text()).to.include(msg)
  })
})
