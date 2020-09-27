<template>
  <div id="app">
    <section>
      <div v-if="!meta.isLoading" class="user">
        <div class="user__info">
          <div v-if="showUserList" class="user__wrapper">
            <a-input
              :value="filterAllVal"
              class="user__input"
              @input="filterInputHandler($event, 'filterAllVal')"
            />
            <ul
              v-for="user in currentUsers"
              :key="user.id"
            >
              <li class="user__item">
                <user-item
                  :user="user"
                  :users-added-state="usersAddedState"
                  @toggle-user="toggleUserHandler"
                  @show-card="showCardHandler"
                />
              </li>
            </ul>
          </div>
          <user-card
            v-else
            class="user__card"
            :user="userToCard"
            :users-added-state="usersAddedState"
            @toggle-user="toggleUserHandler"
            @close="showUserList = true"
          />
        </div>
        <div class="user__info user__info--added">
          <div class="user__added-wrapper">
            <a-input
              :value="filterAddedVal"
              class="user__input"
              @input="filterInputHandler($event, 'filterAddedVal')"
            />
            <ul
              v-for="addedUser in currentAddedUsers"
              :key="addedUser.id"
            >
              <li class="user__item">
                <user-item
                  :user="addedUser"
                  :users-added-state="usersAddedState"
                  @toggle-user="toggleUserHandler"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div v-else class="user__loader" />
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import {debounce} from './utils/index.js'
import aInput from './components/a-input.vue'
import userItem from './components/user-item.vue'
import userCard from './components/user-card.vue'

export default {
  name: 'App',
  components: {
    aInput, 
    userItem, 
    userCard
  },
  data() {
    return {
      showUserList: true,
      userToCard: {},
      usersAddedState: {},
      filterAddedVal: '',
      filterAllVal: ''
    }
  },
  computed: {
    ...mapGetters({
      users: 'users/getUsers',
      meta: 'users/getMeta'
    }),
    currentUsers() {
      return this.filterAllVal 
        ? this.users.filter(item => this.isUserIncludes(item.name, this.filterAllVal)) 
        : this.users
    },
    addedUsers() {
      return this.users.filter(item => this.usersAddedState[item.id])
    },
    currentAddedUsers() {
      return this.filterAddedVal 
        ? this.addedUsers.filter(item => this.isUserIncludes(item.name, this.filterAddedVal)) 
        : this.addedUsers
    },
  },
  created() {
    this.fetchUsersAction()
  },
  methods: {
    ...mapActions({
      fetchUsersAction: 'users/fetch'
    }),
    toggleUserHandler(id) {
      this.usersAddedState[id]
        ? this.$delete(this.usersAddedState, id)
        : this.$set(this.usersAddedState, id, true)
    },
    showCardHandler(user) {
      this.showUserList = false
      this.userToCard = user
    },
    isUserIncludes(name, filterVal) {
      return name.toLowerCase().includes(filterVal.toLowerCase())
    },
    filterInputHandler: debounce( function(value, key) { this[key] = value }, 300)
  }
}
</script>

<style lang="scss">
  @import "./assets/style/app.scss";

  .user {
    display: flex;

    &__info {
      background-color: $color-aqua-squeeze;
      min-height: 100vh;
      width: 56%;
      padding-top: 25px;
      padding-right: 15px;

      &--added {
        background-color: $color-snow-flurry;
        width: 44%;
        padding-left: 15px;
      }
    }

    &__wrapper {
      max-width: 270px;
      margin-left: auto;
    }

    &__input {
      margin-bottom: 15px;
    }

    &__item {
      margin-bottom: 15px;
    }

    &__card {
      margin-left: auto;
    }

    &__added-wrapper {
      max-width: 182px;
    }

    &__loader {
      height: 100vh;
      position: relative;

      &:before {
        content: '';
        position: absolute;
        width: 60px;
        height: 60px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-size: 100%;
        background-repeat: no-repeat;
        background-image: url('assets/img/loader.svg');
        animation: rotation 3s infinite linear;
      }
    }
  }

  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
</style>
