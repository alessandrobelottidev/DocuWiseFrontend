<script>
    import { Link } from 'svelte-routing'

    import config from '../../config.json'
    import { getNotifications } from '@src/api'
    import { notifications } from '@src/stores'

    export let notification
    export let id

    const handleNotificationClick = async () => {
		const req = await fetch(`${config.API_BASE_URL}/notifications/read/${id}`, {
			credentials: 'include',
			method: 'PATCH',
		})

        if (req.ok) 
            $notifications = await getNotifications()
    }
</script>

<li>
    {#if notification.hasAction }
        <Link 
            on:click={handleNotificationClick}
            class="active:bg-emerald-700" to="{notification.actionUrl}"
        >
            <div class="h-2 w-2 rounded-full {notification.read ? 'bg-gray-600' : 'bg-emerald-700'}">
                
            </div>
            <div class="flex flex-col items-start gap-0">
                <p class="font-medium">{notification.title}</p>
                <p class="link link-neutral">{notification.body}</p>
            </div>
        </Link>
    {:else}
        <div class="active:bg-emerald-700">
            <p class="font-medium">{notification.title}</p>
            <p>{notification.body}</p>
        </div>
    {/if}
</li>