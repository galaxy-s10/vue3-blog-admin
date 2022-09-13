import { IForm } from '@/components/Base/Form';
import { IFrontend } from '@/interface';

export const formConfig = (): IForm<IFrontend> => {
  return {
    gridSpan: 16,
    formStyle: {
      justifyContent: 'center',
    },
    labelPlacement: 'left',
    formItems: [
      {
        field: 'frontend_qq_login',
        type: 'switch',
        label: 'qq登录',
        switchConfig: {
          checkedValue: 1,
          unCheckedValue: 2,
          checkedText: '开启',
          unCheckedText: '关闭',
        },

        gridSpan: 4,
      },
      {
        field: 'frontend_github_login',
        type: 'switch',
        label: 'github登录',
        switchConfig: {
          checkedValue: 1,
          unCheckedValue: 2,
          checkedText: '开启',
          unCheckedText: '关闭',
        },

        gridSpan: 4,
      },
      {
        field: 'frontend_email_login',
        type: 'switch',
        label: 'email登录',
        switchConfig: {
          checkedValue: 1,
          unCheckedValue: 2,
          checkedText: '开启',
          unCheckedText: '关闭',
        },

        gridSpan: 4,
      },
      {
        field: 'frontend_comment',
        type: 'switch',
        label: '留言板',
        switchConfig: {
          checkedValue: 1,
          unCheckedValue: 2,
          checkedText: '开启',
          unCheckedText: '关闭',
        },

        gridSpan: 4,
      },
      {
        field: 'frontend_link',
        type: 'switch',
        label: '申请友链',
        switchConfig: {
          checkedValue: 1,
          unCheckedValue: 2,
          checkedText: '开启',
          unCheckedText: '关闭',
        },

        gridSpan: 4,
      },
      {
        field: 'frontend_dialog',
        type: 'switch',
        label: '首页弹窗',
        switchConfig: {
          checkedValue: 1,
          unCheckedValue: 2,
          checkedText: '开启',
          unCheckedText: '关闭',
        },

        gridSpan: 4,
      },
      {
        field: 'frontend_shutdown',
        type: 'switch',
        label: '停机维护',
        switchConfig: {
          checkedValue: 1,
          unCheckedValue: 2,
          checkedText: '开启',
          unCheckedText: '关闭',
        },

        gridSpan: 4,
      },
      {
        field: 'frontend_shutdown_content',
        type: 'markdown',
        label: '停机维护的内容',
        placeholder: '请输入停机维护的内容',
        gridSpan: 24,
      },
      {
        field: 'frontend_dialog_content',
        type: 'markdown',
        label: '首页弹窗的内容',
        placeholder: '请输入首页弹窗的内容',
        gridSpan: 24,
      },
      {
        field: 'frontend_about',
        type: 'markdown',
        label: '关于页面的内容',
        placeholder: '请输入关于页面的内容',
        gridSpan: 24,
        rule: [{ required: true, trigger: 'blur' }],
      },
    ],
  };
};
