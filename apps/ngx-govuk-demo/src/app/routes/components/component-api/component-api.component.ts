/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { JSONOutput } from 'typedoc';
import { ImportCodePipe } from './import-code.pipe';

@Component({
  selector: 'ngx-govuk-api',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterLink, ImportCodePipe],
  templateUrl: './component-api.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentApiComponent {
  componentId = input<string>('');
  docs = this.getJson();

  constructor(private http: HttpClient) {}

  getJson() {
    const observable = this.http
      .get<JSONOutput.ProjectReflection>(`./assets/documentation.json`, {
        responseType: 'json',
      })
      .pipe(
        map((json) => {
          console.log(this.componentId(), json);

          const componentJson = json.children
            ?.filter((module) =>
              module.name.startsWith(`${this.componentId()}/`)
            )
            .map((component) =>
              component.children ? component.children[0] : null
            );

          console.log(componentJson);

          const result = componentJson?.map((component) => {
            if (!component) {
              return { name: '' };
            }

            return {
              name: component.name,
              selector: component.comment?.blockTags?.find(
                (tag) => tag.tag === '@selector'
              )?.content[0].text,
              comments: this.getCommentSummary(component.comment),
              inputs: this.getInputs(component),
              methods: this.getMethods(component),
              properties: this.getProperties(component),
            };
          });
          return result?.sort((a, b) => a.name.localeCompare(b.name));
        })
      );

    return toSignal(observable);
  }

  getInputs(component: JSONOutput.DeclarationReflection) {
    const inputs = component.children
      ?.filter(
        (member) =>
          member.type?.type === 'reference' &&
          member.type?.name === 'InputSignal'
      )
      .map((member) => ({
        name: member.name,
        type: `InputSignal<${(
          member.type as JSONOutput.ReferenceType
        )?.typeArguments
          ?.map((arg: any) => arg.name)
          .join(', ')}>`,
        comments: this.getCommentSummary(member.comment),
        required: member.comment?.blockTags?.find(
          (tag) => tag.tag === '@required'
        )
          ? 'True'
          : 'False',
      }));
    return inputs?.length ? inputs : null;
  }

  getMethods(component: JSONOutput.DeclarationReflection) {
    const methods = component.children
      ?.filter((member) => member.kind === 2048)
      .map((member) => {
        const signature = member.signatures ? member.signatures[0] : null;
        return {
          name: signature?.name,
          comments: this.getCommentSummary(signature?.comment),
        };
      });
    return methods?.length ? methods : null;
  }

  getProperties(component: JSONOutput.DeclarationReflection) {
    const properties = component.children
      ?.filter(
        (member) =>
          member.type?.type === 'reference' &&
          member.type?.name === 'WritableSignal'
      )
      .map((member) => {
        return {
          name: member?.name,
          comments: this.getCommentSummary(member.comment),
          type: `WritableSignal<${(
            member.type as JSONOutput.ReferenceType
          )?.typeArguments
            ?.map((arg: any) => arg.name)
            .join(', ')}>`,
        };
      });
    return properties?.length ? properties : null;
  }

  getCommentSummary(comment?: JSONOutput.Comment) {
    if (!comment) {
      return [];
    }
    return comment?.summary[0].text.split('\n\n');
  }
}
