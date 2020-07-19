import AuthenticatedRoute from 'ghost-admin/routes/authenticated';
import Route from '@ember/routing/route';

export default AuthenticatedRoute.extend({

    queryParams: {
        page: { refreshModel: true },
    },
    async model(params, transition) {
        const currentPage = parseInt(transition.to.queryParams.page || 1);
        const response = await fetch(`/ghost/api/v2/admin/registrations/?page=${currentPage}`);
        const registrationsResponse = await response.json();
        const registrations = registrationsResponse.registrations.registrations;
        const total = registrationsResponse.registrations.total;

        let prevPage = false;
        if (currentPage > 1) {
            prevPage = { page: currentPage - 1 };
        }

        let nextPage = { page: currentPage + 1 };

        return { registrations, total, prevPage, nextPage };
    }
});
