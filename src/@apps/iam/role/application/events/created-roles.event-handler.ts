import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedRolesEvent } from './created-roles.event';

@EventsHandler(CreatedRolesEvent)
export class CreatedRolesEventHandler implements IEventHandler<CreatedRolesEvent>
{
    handle(event: CreatedRolesEvent): void
    {
        // console.log('CreatedRolesEvent: ', event);
    }
}