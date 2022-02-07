<script context="module">
import { BASE } from "$lib/config";


    export async function load() {
        return {
            status: 302,
            redirect: `${BASE}/docs/dev/`
        };
    }
</script>