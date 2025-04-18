import { observable } from "mobx";
import { Chat } from "@/types/chat";
import ChatStore from "@/stores/chat-store";
import i18next from "i18next";
import { createRef } from "react";
import {
  getChatById,
  getSortedChatList,
  createNewChat,
  selectChat,
  deleteChat,
  updateChatTitle,
  exportChatToTxt,
  cleanupOldChats,
} from "@/dbs/table-chat-func";
import { LAYOUT_MODE, LayoutModeType } from '@/constants/layout';

let windowWidth = window.innerWidth;
window.addEventListener("resize", () => {
  windowWidth = window.innerWidth;
});

const $store = observable({
  chatList: [] as Chat[],
  isInitialized: false,
  showForm: false,
  formData: null as any,
  messagesEndRef: createRef<HTMLDivElement>(),

  isMenuVisible() {
    return false;
  },
  /**
   * 布局模式配置管理
   * ----------------------------------------
   * 系统分为两个主要层级：
   * 1. AI 辅助层 (chat-view)
   *    - 处理AI对话交互
   *    - 管理聊天界面布局
   *
   * 2. 业务层 (domain-view)
   *    - 处理核心业务逻辑
   *    - 展示业务相关内容
   * ----------------------------------------
   * @param modeName 布局模式名称
   * @returns {Object} 布局配置信息
   */
  fetchLayoutMode(modeName: LayoutModeType) {
    switch (modeName) {
      // 1.左侧聊天, 右侧业务层
      case LAYOUT_MODE.LEFT_CHAT_RIGHT_DOMAIN:
        return {
          modeName: LAYOUT_MODE.LEFT_CHAT_RIGHT_DOMAIN,
          isMenuVisible: false,
          visibleChatView: true,
          visibleDomainView: true,
        };
      // 2.左侧业务层, 右侧聊天层
      case LAYOUT_MODE.LEFT_DOMAIN_RIGHT_CHAT:
        return {
          modeName: LAYOUT_MODE.LEFT_DOMAIN_RIGHT_CHAT,
          isMenuVisible: false,
          visibleChatView: true,
          visibleDomainView: true,
        };
      // 3.底部业务层, 顶部Ai聊天层悬浮模式, 全屏悬浮
      case LAYOUT_MODE.BASE_DOMAIN_HOVER_CHAT_FULL:
        return {
          modeName: LAYOUT_MODE.BASE_DOMAIN_HOVER_CHAT_FULL,
          isMenuVisible: true,
          visibleChatView: true,
          visibleDomainView: true,
        };
      // 4.底部AI层, 顶部Ai聊天层悬浮模式, 左侧悬浮  
      case LAYOUT_MODE.BASE_DOMAIN_HOVER_CHAT_LEFT:
        return {
          modeName: LAYOUT_MODE.BASE_DOMAIN_HOVER_CHAT_LEFT,
          isMenuVisible: false,
          visibleChatView: true,
          visibleDomainView: true,
        };
      // 5.底部AI层, 顶部Ai聊天层悬浮模式, 右侧悬浮
      case LAYOUT_MODE.BASE_DOMAIN_HOVER_CHAT_RIGHT:
        return {
          modeName: LAYOUT_MODE.BASE_DOMAIN_HOVER_CHAT_RIGHT,
          isMenuVisible: false,
          visibleChatView: true,
          visibleDomainView: true,
        };
      // 6.底部AI层顶部悬浮模式  
      case LAYOUT_MODE.BASE_CHAT_HOVER_DOMAIN:
        return {
          modeName: LAYOUT_MODE.BASE_CHAT_HOVER_DOMAIN,
          isMenuVisible: true,
          visibleChatView: true,
          visibleDomainView: true,
        };
      // 7.单视图模式-只显示聊天视图 
      case LAYOUT_MODE.ONLY_CHAT:
        return {
          modeName: LAYOUT_MODE.ONLY_CHAT,
          isMenuVisible: true,
          visibleChatView: true,
          visibleDomainView: false,
        };
      // 8.单视图模式-只显示业务视图  
      case LAYOUT_MODE.ONLY_DOMAIN:
        return {
          modeName: LAYOUT_MODE.ONLY_DOMAIN,
          isMenuVisible: true,
          visibleChatView: false,
          visibleDomainView: true,
        };
    }
  },
  // 当前布局模式
  currentLayoutMode: LAYOUT_MODE.LEFT_CHAT_RIGHT_DOMAIN as LayoutModeType,

  setCurrentLayoutMode(modeName: LayoutModeType) {
    this.currentLayoutMode = modeName;
  },
  
  setShowForm(show: boolean) {
    this.showForm = show;
  },

  setFormData(data: any) {
    this.formData = data;
  },

  // 获取过滤后的聊天列表
  get filteredChatList() {
    return this.chatList;
  },

  // 在 init 方法中添加排序
  async init() {
    if (this.isInitialized) {
      return;
    }

    try {
      this.isInitialized = true;

      // 清理过期数据
      await cleanupOldChats(30);

      // 获取并排序聊天列表
      this.chatList = await getSortedChatList();

      if (this.chatList.length === 0) {
        await this.createNewChat();
        return;
      }

      // 获取选中的会话
      const selectedChat = this.chatList.find((chat) => chat.isSelected === 1);
      if (selectedChat) {
        ChatStore.setActiveChatSessionId(selectedChat.sessionId);
        ChatStore.setLocalMessages(selectedChat.messages);
      }
    } catch (error) {
      console.error("初始化失败:", error);
    }
  },

  async createNewChat() {
    try {
      const newChat = await createNewChat(i18next.t("menu.chatTitle"));
      if (newChat) {
        // 重新获取并排序聊天列表
        this.chatList = await getSortedChatList();
        ChatStore.setActiveChatSessionId(newChat.sessionId);
        ChatStore.setLocalMessages(newChat.messages);
      }
    } catch (error) {
      console.error("创建新会话失败:", error);
      ChatStore.setIsCreating(false);
    }
  },

  // 是否是新会话
  isSelectedChat(chatId: string) {
    const currentSelected = this.chatList.find((chat) => chat.isSelected === 1);
    return currentSelected?.id === chatId;
  },

  // 导出对话
  async exportChat(chatId: string) {
    try {
      const chat = await getChatById(chatId);
      if (chat) {
        exportChatToTxt(chat);
      } else {
        console.error("未找到对应的会话");
      }
    } catch (error) {
      console.error("导出会话失败:", error);
    }
  },

  // selectChat 方法中添加排序
  async selectChat(selectedId: string) {
    console.log("当前selectChat-selectedId-->", selectedId);
    ChatStore.setIsShowSkeleton(true);
    try {
      // 清空本地和新消息
      ChatStore.clearLoaclAndNewMessages();

      await selectChat(selectedId);

      // 重新获取并排序聊天列表
      this.chatList = await getSortedChatList();

      const selectedChat = this.chatList.find((chat) => chat.id === selectedId);
      if (selectedChat) {
        ChatStore.setActiveChatSessionId(selectedChat.sessionId);
        ChatStore.setLocalMessages(selectedChat.messages);
        if (selectedChat.messages.length === 0) {
          ChatStore.setShowWelcome(true);
        }
      }
    } catch (error) {
      ChatStore.setIsShowSkeleton(false);
      console.error("选择会话失败:", error);
    }
    setTimeout(() => {
      ChatStore.setIsShowSkeleton(false);
    }, 200);
  },

  // deleteChat 方法中添加排序
  async deleteChat(chatId: string) {
    try {
      await deleteChat(chatId);

      // 重新获取并排序聊天列表
      this.chatList = await getSortedChatList();

      // 如果删除的是当前选中的会话，选择新的会话或显示欢迎页
      if (this.chatList.length > 0) {
        if (!this.chatList.some((chat) => chat.isSelected === 1)) {
          await this.selectChat(this.chatList[0].id);
        }
      } else {
        // 删除的是新会话，显示欢迎页, 会话标题变成标题1, 数据库的messages清空
        await this.createNewChat();
        ChatStore.setShowWelcome(true);
        ChatStore.setActiveChatSessionId("");
        ChatStore.clearLoaclAndNewMessages();
      }
    } catch (error) {
      console.error("删除会话失败:", error);
    }
  },
  async updateChatTitle(chatId: string, newTitle: string) {
    try {
      await updateChatTitle(chatId, newTitle);

      // 重新获取并排序聊天列表
      this.chatList = await getSortedChatList();
    } catch (error) {
      console.error("更新会话标题失败:", error);
    }
  },

  messageRefscrollToBottom(behavior: ScrollBehavior = "smooth", t = 350) {
    if (!t || t === 0) {
      this.messagesEndRef.current?.scrollIntoView({
        behavior,
      });
      return;
    }
    setTimeout(() => {
      this.messagesEndRef.current?.scrollIntoView({
        behavior,
      });
    }, t);
  },
});

export default $store;
