import { NgModule } from '@angular/core';
import { CapitalizePipe } from './capitalize/capitalize';
import { NameFileUrlPipe } from './name-file-url/name-file-url';
import { ShortDescriptionPipe } from './short-description/short-description';
import { ShowIconPipe } from './show-icon/show-icon';
@NgModule({
	declarations: [CapitalizePipe,
    NameFileUrlPipe,
    ShortDescriptionPipe,
    ShowIconPipe],
	imports: [],
	exports: [CapitalizePipe,
    NameFileUrlPipe,
    ShortDescriptionPipe,
    ShowIconPipe]
})
export class PipesModule {}
