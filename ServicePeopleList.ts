import peoplesJson from './people.json'

type TServicePeopleListResult = any;

export class ServicePeopleList
{
    simulateError:boolean = false;
    simulateDelay:number = 1000;

    async result ():Promise<TServicePeopleListResult>
    {
        await wait(this.simulateDelay);
        if(this.simulateError)
            throw new HTTPExceptionTest();
        const peopleSort = peoplesJson.people.sort((a,b) =>
            a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
        )
        return {
            status:200,
            data: peopleSort
        };
    }
}


class HTTPExceptionTest extends Error
{
    readonly response = {
        status:500,
        data:`Internal server error test`
    };

    constructor()
    {
        super(`Network Error`);
    }
}


function wait(time:number)
{
    return new Promise(res => {
        setTimeout(() => res(true), time);
    });
}