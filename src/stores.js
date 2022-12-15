import { writable } from 'svelte/store'

export const loggedIn = writable(false)
export const notifications = writable([])
export const unreadNotifications = writable(0)
