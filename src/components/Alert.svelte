<script lang="ts">
  import { onMount } from "svelte";
  import { getAlerts } from "../js/alertData.mts";
  import type { Alert } from "../js/types.mts";

  let alerts: any[] = $state([]);

  async function init() {
    console.log("component: getting alerts");
    const data = await getAlerts();
    alerts = data;
    console.log("Alerts: " + alerts);
  }

  onMount(init);
</script>

<section>
  {#each alerts as alert}
    <p style="background-color: {alert.background}; color: {alert.color};">
      {alert.message}
    </p>
  {/each}
</section>
