import { defineFakeRoute } from "vite-plugin-fake-server/client";
import { faker } from "@faker-js/faker/locale/zh_CN";

export default defineFakeRoute([
  // 用户管理
  {
    url: "/user",
    method: "post",
    response: ({ body }) => {
      let list = [
        {
          avatar: "https://avatars.githubusercontent.com/u/44761321",
          username: "admin",
          nickname: "小铭",
          phone: "15888886789",
          email: faker.internet.email(),
          sex: "男",
          id: 1,
          status: 1,
          dept: {
            // 部门id
            id: 103,
            // 部门名称
            name: "研发部门"
          },
          remark: "管理员",
          createTime: 1605456000000
        },
        {
          avatar: "https://avatars.githubusercontent.com/u/52823142",
          username: "common",
          nickname: "小林",
          phone: "18288882345",
          email: faker.internet.email(),
          sex: "女",
          id: 2,
          status: 1,
          dept: {
            id: 105,
            name: "测试部门"
          },
          remark: "普通用户",
          createTime: 1605456000000
        }
      ];
      list = list.filter(item => item.username.includes(body?.username));
      list = list.filter(item =>
        String(item.status).includes(String(body?.status))
      );
      if (body.phone) list = list.filter(item => item.phone === body.phone);
      if (body.deptId) list = list.filter(item => item.dept.id === body.deptId);
      return {
        success: true,
        data: {
          list,
          total: list.length, // 总条目数
          pageSize: 10, // 每页显示条目个数
          currentPage: 1 // 当前页数
        }
      };
    }
  },
  // 用户管理-获取所有角色列表
  {
    url: "/list-all-role",
    method: "get",
    response: () => {
      return {
        success: true,
        data: [
          { id: 1, name: "超级管理员" },
          { id: 2, name: "普通角色" }
        ]
      };
    }
  },
  // 用户管理-根据 userId 获取对应角色 id 列表（userId：用户id）
  {
    url: "/list-role-ids",
    method: "post",
    response: ({ body }) => {
      if (body.userId) {
        if (body.userId == 1) {
          return {
            success: true,
            data: [1]
          };
        } else if (body.userId == 2) {
          return {
            success: true,
            data: [2]
          };
        }
      } else {
        return {
          success: false,
          data: []
        };
      }
    }
  },
  // 部门管理
  {
    url: "/dept",
    method: "post",
    response: () => {
      return {
        success: true,
        data: [
          {
            name: "杭州总公司",
            parentId: 0,
            id: 100,
            sort: 0,
            phone: "15888888888",
            principal: faker.person.firstName(),
            email: faker.internet.email(),
            status: 1, // 状态 1 启用 0 停用
            type: 1, // 1 公司 2 分公司 3 部门
            createTime: 1605456000000,
            remark: "这里是备注信息这里是备注信息这里是备注信息这里是备注信息"
          },
          {
            name: "郑州分公司",
            parentId: 100,
            id: 101,
            sort: 1,
            phone: "15888888888",
            principal: faker.person.firstName(),
            email: faker.internet.email(),
            status: 1,
            type: 2,
            createTime: 1605456000000,
            remark: "这里是备注信息这里是备注信息这里是备注信息这里是备注信息"
          },
          {
            name: "研发部门",
            parentId: 101,
            id: 103,
            sort: 1,
            phone: "15888888888",
            principal: faker.person.firstName(),
            email: faker.internet.email(),
            status: 1,
            type: 3,
            createTime: 1605456000000,
            remark: "这里是备注信息这里是备注信息这里是备注信息这里是备注信息"
          },
          {
            name: "市场部门",
            parentId: 102,
            id: 108,
            sort: 1,
            phone: "15888888888",
            principal: faker.person.firstName(),
            email: faker.internet.email(),
            status: 1,
            type: 3,
            createTime: 1605456000000,
            remark: "这里是备注信息这里是备注信息这里是备注信息这里是备注信息"
          },
          {
            name: "深圳分公司",
            parentId: 100,
            id: 102,
            sort: 2,
            phone: "15888888888",
            principal: faker.person.firstName(),
            email: faker.internet.email(),
            status: 1,
            type: 2,
            createTime: 1605456000000,
            remark: "这里是备注信息这里是备注信息这里是备注信息这里是备注信息"
          },
          {
            name: "市场部门",
            parentId: 101,
            id: 104,
            sort: 2,
            phone: "15888888888",
            principal: faker.person.firstName(),
            email: faker.internet.email(),
            status: 1,
            type: 3,
            createTime: 1605456000000,
            remark: "这里是备注信息这里是备注信息这里是备注信息这里是备注信息"
          },
          {
            name: "财务部门",
            parentId: 102,
            id: 109,
            sort: 2,
            phone: "15888888888",
            principal: faker.person.firstName(),
            email: faker.internet.email(),
            status: 1,
            type: 3,
            createTime: 1605456000000,
            remark: "这里是备注信息这里是备注信息这里是备注信息这里是备注信息"
          },
          {
            name: "测试部门",
            parentId: 101,
            id: 105,
            sort: 3,
            phone: "15888888888",
            principal: faker.person.firstName(),
            email: faker.internet.email(),
            status: 0,
            type: 3,
            createTime: 1605456000000,
            remark: "这里是备注信息这里是备注信息这里是备注信息这里是备注信息"
          },
          {
            name: "财务部门",
            parentId: 101,
            id: 106,
            sort: 4,
            phone: "15888888888",
            principal: faker.person.firstName(),
            email: faker.internet.email(),
            status: 1,
            type: 3,
            createTime: 1605456000000,
            remark: "这里是备注信息这里是备注信息这里是备注信息这里是备注信息"
          },
          {
            name: "运维部门",
            parentId: 101,
            id: 107,
            sort: 5,
            phone: "15888888888",
            principal: faker.person.firstName(),
            email: faker.internet.email(),
            status: 0,
            type: 3,
            createTime: 1605456000000,
            remark: "这里是备注信息这里是备注信息这里是备注信息这里是备注信息"
          }
        ]
      };
    }
  },

  // 角色管理
  {
    url: "/role",
    method: "post",
    response: ({ body }) => {
      let list = [
        {
          createTime: 1605456000000, // 时间戳（毫秒ms）
          updateTime: 1684512000000,
          id: 1,
          name: "超级管理员",
          code: "admin",
          status:1, // 状态 1 启用 0 停用
          remark: "超级管理员拥有最高权限"
        },
        {
          createTime: 1605456000000,
          updateTime: 1684512000000,
          id:2,
          name: "普通角色",
          code: "common",
          status:1,
          remark: "普通角色拥有部分权限"
        }
      ];
      list = list.filter(item => item.name.includes(body?.name));
      list = list.filter(item =>
        String(item.status).includes(String(body?.status))
      );
      if (body.code) list = list.filter(item => item.code === body.code);
      return {
        success: true,
        data: {
          list,
          total: list.length, // 总条目数
          pageSize: 10, // 每页显示条目个数
          currentPage: 1 // 当前页数
        }
      };
    }
  },

  // 角色管理-权限-菜单权限
  {
    url: "/role-menu",
    method: "post",
    response: () => {
      return {
        success: true,
        data: [
          // 权限管理
          {
            parentId: 0,
            id: 200,
            menuType: 0,
            title: "权限管理"
          },
          {
            parentId: 200,
            id: 201,
            menuType: 0,
            title: "角色管理"
          },
          {
            parentId: 200,
            id: 202,
            menuType: 0,
            title: "用户权限"
          },
          {
            parentId: 202,
            id: 203,
            menuType: 3,
            title: "添加"
          },
          {
            parentId: 202,
            id: 204,
            menuType: 3,
            title: "修改"
          },
          {
            parentId: 202,
            id: 205,
            menuType: 3,
            title: "删除"
          },
          // 系统管理
          {
            parentId: 0,
            id: 300,
            menuType: 0,
            title: "系统管理"
          },
          {
            parentId: 300,
            id: 301,
            menuType: 0,
            title: "用户管理"
          },
          {
            parentId: 300,
            id: 302,
            menuType: 0,
            title: "部门管理"
          }
        ]
      };
    }
  },
  // 角色管理-权限-菜单权限-根据角色 id 查对应菜单
  {
    url: "/role-menu-ids",
    method: "post",
    response: ({ body }) => {
      if (body.id == 1) {
        return {
          success: true,
          data: [
            100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 200, 201,
            202, 203, 204, 205, 300, 301, 302, 303, 304, 400, 401, 402, 403,
            404, 500, 501, 502, 503
          ]
        };
      } else if (body.id == 2) {
        return {
          success: true,
          data: [
            100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 404, 500,
            501, 502, 503
          ]
        };
      }
    }
  },

  
  //用户权限列表
  {
    url:"/user-permission",
    method: "post",
    response: ({ body }) => {
      let list=[
        {
          username:"小铭",
          phone:"15638480984",
          deptname: {
            // 部门id
            id: 103,
            // 部门名称
            name: "研发部门",
          },
          role:"超级管理员"
        },
        {
          username:"小李",
          phone:"18395021045",
          deptname: {
            // 部门id
            id: 105,
            // 部门名称
            name: "测试部门"
          },
          role:"普通角色"
        }
      ]
      list = list.filter(item => item.username.includes(body?.username));
      list = list.filter(item => item.phone.includes(body?.phone));
      list = list.filter(item => item.deptname.name.includes(body?.deptname));
      return {
        success: true,
        data: {
          list,
          total: list.length, // 总条目数
          pageSize: 10, // 每页显示条目个数
          currentPage: 1 // 当前页数
        }
    }
  }
  }
]);