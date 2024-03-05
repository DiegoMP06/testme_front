<script setup>
    import HeaderDashboard from '@/components/dashboard/HeaderDashboard.vue';
    import MenuAsideDashboard from '@/components/dashboard/MenuAsideDashboard.vue';
    import AsideDashboard from '@/components/dashboard/AsideDashboard.vue';
</script>

<template>
    <div class="flex min-h-screen lg:h-screen flex-col">
        <HeaderDashboard />

        <MenuAsideDashboard />

        <div class="flex-1 flex overflow-y-auto">
            <AsideDashboard />

            <main class="px-4 py-8 flex-1 overflow-y-auto relative">
                <div class="container mx-auto">
                    <RouterView />
                </div>
            </main>
        </div>
    </div>
</template>