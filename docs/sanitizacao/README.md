# Tutorial de configuração da ferramenta de sanitização 3.0A

A ferramenta **Sanitização Automática dos Navegadores** remove os perfis locais de Google Chrome, Microsoft Edge e Mozilla Firefox ao fazer logon no Windows. Ela foi desenvolvida no projeto Hardening e Proteção de Sessões em Computadores Compartilhados do IF Sudeste MG, Campus Juiz de Fora.

Este tutorial organiza o conteúdo fornecido em `sistemaDeLimpeza3.txt`, selecionando **.NET como método de remoção** (`$MetodoRemocao='dotnet'`) e indicando o nome correto do log: **`SanitizacaoNavegadores_3.0A.log`**.

## Antes de configurar

Use uma estação de testes ou uma conta de testes e salve o que precisar antes da primeira execução. A rotina encerra os navegadores à força e exclui seus diretórios de perfil, incluindo cookies, histórico, credenciais salvas, favoritos, extensões e configurações locais. Desativar a tarefa depois não recupera esses dados.

A limpeza usa as pastas da conta do Windows que executa a tarefa. Configure a tarefa nessa conta, especialmente quando uma mesma conta é compartilhada entre pessoas. Executá-la em outra conta não limpa automaticamente o perfil da conta compartilhada.

O procedimento pressupõe Windows 10 ou 11 com Windows PowerShell e Agendador de Tarefas disponíveis. A compatibilidade com Windows 7 não é oferecida. A execução em cada ambiente precisa ser validada antes da implantação.

## 1. Abrir o Agendador de Tarefas

1. Pressione **Win + R**, digite `taskschd.msc` e pressione **Enter**.
2. Na Biblioteca do Agendador de Tarefas, escolha **Criar Tarefa**.
3. Na guia **Geral**, preencha:

| Campo | Valor |
| --- | --- |
| Nome | Sanitização Automática dos Navegadores |
| Descrição | Remove os perfis locais de Chrome, Edge e Firefox no logon, com remoção via .NET, verificação e registro de resultados. |
| Conta de usuário | A conta compartilhada cujos perfis de navegador serão limpos |
| Opção de segurança | Executar somente quando o usuário estiver conectado |

Use as permissões normais dessa conta; a rotina atua nos próprios diretórios de usuário e não requer marcar **Executar com privilégios mais altos** para esse uso.

## 2. Configurar o disparador

Na guia **Disparadores**, clique em **Novo** e configure:

- **Iniciar a tarefa:** Ao fazer logon.
- **Usuário específico:** a mesma conta selecionada na guia Geral.
- **Habilitado:** marcado.

A limpeza acontece na entrada dessa conta no Windows. Sair do navegador ou bloquear a estação não dispara esse procedimento.

## 3. Configurar a ação com remoção via .NET

Na guia **Ações**, clique em **Novo** e selecione **Iniciar um programa**.

| Campo | Valor |
| --- | --- |
| Programa/script | `powershell.exe` |
| Adicionar argumentos | Copie o conteúdo completo do bloco abaixo |
| Iniciar em | Deixe vazio |

O executável PowerShell hospeda a rotina e coordena as etapas. **A remoção selecionada é .NET**, realizada por `System.IO.Directory.Delete()`. Mantenha `$MetodoRemocao='dotnet'` nos argumentos.

Copie somente a linha dentro do bloco, sem as marcas de formatação, para **Adicionar argumentos**. Ela contém o comando completo; não a execute no terminal apenas para configurar a tarefa.

```powershell
-NoProfile -NonInteractive -WindowStyle Hidden -Command "& { $FalharSilenciosamente=$false; $MetodoRemocao='dotnet'; $MaxTentativas=3; $TimeoutProcessosSeg=4; $IntervaloVerificacaoMs=200; $LogPath=Join-Path $env:TEMP 'SanitizacaoNavegadores_3.0A.log'; function Log([string]$Mensagem) { if(-not $FalharSilenciosamente) { Add-Content -LiteralPath $LogPath -Value ('{0:yyyy-MM-dd HH:mm:ss.fff} | {1}' -f (Get-Date),$Mensagem) -ErrorAction SilentlyContinue } }; if(-not $FalharSilenciosamente) { Set-Content -LiteralPath $LogPath -Value ('=== SANITIZACAO 3.0A | METODO={0} | {1:yyyy-MM-dd HH:mm:ss.fff} ===' -f $MetodoRemocao,(Get-Date)) -ErrorAction SilentlyContinue }; $TempoTotal=[Diagnostics.Stopwatch]::StartNew(); function Aguardar-Processos([string[]]$Nomes) { $sw=[Diagnostics.Stopwatch]::StartNew(); do { $Processos=Get-Process -Name $Nomes -ErrorAction SilentlyContinue; if(-not $Processos) { $sw.Stop(); Log ('Processos encerrados em {0} ms: {1}' -f $sw.ElapsedMilliseconds,($Nomes -join ',')); return $true }; $Processos | Stop-Process -Force -ErrorAction SilentlyContinue; Start-Sleep -Milliseconds $IntervaloVerificacaoMs } while($sw.Elapsed.TotalSeconds -lt $TimeoutProcessosSeg); $Restantes=Get-Process -Name $Nomes -ErrorAction SilentlyContinue; $sw.Stop(); if($Restantes) { Log ('TIMEOUT ao encerrar processos apos {0} ms: {1}' -f $sw.ElapsedMilliseconds,($Nomes -join ',')); return $false }; return $true }; function Remover-Verificando([string]$Caminho,[string]$Nome,[string[]]$Processos) { if(-not (Test-Path -LiteralPath $Caminho)) { Log ($Nome + ' | pasta inexistente | OK'); return $true }; for($Tentativa=1; $Tentativa -le $MaxTentativas; $Tentativa++) { if($Processos -and $Processos.Count -gt 0) { $null=Aguardar-Processos $Processos }; $ErroRemocao=$null; $ExitCode=$null; $sw=[Diagnostics.Stopwatch]::StartNew(); switch($MetodoRemocao) { 'powershell' { try { Remove-Item -LiteralPath $Caminho -Recurse -Force -ErrorAction Stop } catch { $ErroRemocao=$_.Exception.Message } }; 'cmd' { if($FalharSilenciosamente) { $null=& $env:ComSpec /d /c rd /s /q $Caminho 2>$null } else { $SaidaCmd=(& $env:ComSpec /d /c rd /s /q $Caminho 2>&1 | Out-String).Trim(); if($SaidaCmd) { $ErroRemocao=$SaidaCmd } }; $ExitCode=$LASTEXITCODE }; 'dotnet' { try { [System.IO.Directory]::Delete($Caminho,$true) } catch { $ErroRemocao=$_.Exception.Message } }; default { $ErroRemocao='Metodo de remocao invalido: ' + $MetodoRemocao } }; $sw.Stop(); $AindaExiste=Test-Path -LiteralPath $Caminho; Log ('{0} | metodo={1} | tentativa {2}/{3} | tempo={4} ms | exitCode={5} | aindaExiste={6}' -f $Nome,$MetodoRemocao,$Tentativa,$MaxTentativas,$sw.ElapsedMilliseconds,$ExitCode,$AindaExiste); if($ErroRemocao) { Log ($Nome + ' | erro/saida: ' + $ErroRemocao) }; if(-not $AindaExiste) { return $true } }; Log ($Nome + ' | FALHA apos todas as tentativas'); return $false }; $TempoStop=[Diagnostics.Stopwatch]::StartNew(); $ProcessosEncerrados=Aguardar-Processos @('chrome','msedge','firefox'); $TempoStop.Stop(); Log ('ETAPA encerramento inicial = {0} ms | resultado={1}' -f $TempoStop.ElapsedMilliseconds,$ProcessosEncerrados); $ChromePath=Join-Path $env:LOCALAPPDATA 'Google\Chrome\User Data'; $swChrome=[Diagnostics.Stopwatch]::StartNew(); $ChromeOk=Remover-Verificando $ChromePath 'Chrome' @('chrome'); $swChrome.Stop(); Log ('ETAPA Chrome total = {0} ms | resultado={1}' -f $swChrome.ElapsedMilliseconds,$ChromeOk); $EdgePath=Join-Path $env:LOCALAPPDATA 'Microsoft\Edge\User Data'; $swEdge=[Diagnostics.Stopwatch]::StartNew(); $EdgeOk=Remover-Verificando $EdgePath 'Edge' @('msedge'); $swEdge.Stop(); Log ('ETAPA Edge total = {0} ms | resultado={1}' -f $swEdge.ElapsedMilliseconds,$EdgeOk); $FirefoxRoaming=Join-Path $env:APPDATA 'Mozilla\Firefox'; $FirefoxLocal=Join-Path $env:LOCALAPPDATA 'Mozilla\Firefox'; $swFirefox=[Diagnostics.Stopwatch]::StartNew(); $FirefoxRoamingOk=Remover-Verificando $FirefoxRoaming 'Firefox Roaming' @('firefox'); $FirefoxLocalOk=Remover-Verificando $FirefoxLocal 'Firefox Local' @('firefox'); $FirefoxStoreOk=$true; $swAppx=[Diagnostics.Stopwatch]::StartNew(); $PacoteFirefox=$null; $ErroAppx=$null; try { $PacoteFirefox=Get-AppxPackage -Name 'Mozilla.Firefox' -ErrorAction Stop | Select-Object -First 1 } catch { $ErroAppx=$_.Exception.Message }; $swAppx.Stop(); Log ('Consulta Firefox Store = {0} ms | encontrado={1}' -f $swAppx.ElapsedMilliseconds,[bool]$PacoteFirefox); if($PacoteFirefox) { $RaizPacote=Join-Path (Join-Path $env:LOCALAPPDATA 'Packages') $PacoteFirefox.PackageFamilyName; $StoreRoaming=Join-Path $RaizPacote 'LocalCache\Roaming\Mozilla\Firefox'; $StoreLocal=Join-Path $RaizPacote 'LocalCache\Local\Mozilla\Firefox'; $StoreRoamingOk=Remover-Verificando $StoreRoaming 'Firefox Store Roaming' @('firefox'); $StoreLocalOk=Remover-Verificando $StoreLocal 'Firefox Store Local' @('firefox'); $FirefoxStoreOk=$StoreRoamingOk -and $StoreLocalOk } elseif($ErroAppx) { Log ('Consulta Get-AppxPackage falhou; usando fallback em Packages: ' + $ErroAppx); $FirefoxStoreOk=$true; try { $PastasStore=Get-ChildItem (Join-Path $env:LOCALAPPDATA 'Packages') -Directory -Filter 'Mozilla.Firefox_*' -ErrorAction Stop; foreach($PastaStore in $PastasStore) { $FirefoxStoreOk=(Remover-Verificando (Join-Path $PastaStore.FullName 'LocalCache\Roaming\Mozilla\Firefox') 'Firefox Store Roaming fallback' @('firefox')) -and $FirefoxStoreOk; $FirefoxStoreOk=(Remover-Verificando (Join-Path $PastaStore.FullName 'LocalCache\Local\Mozilla\Firefox') 'Firefox Store Local fallback' @('firefox')) -and $FirefoxStoreOk } } catch { Log ('Falha no fallback Firefox Store: ' + $_.Exception.Message); $FirefoxStoreOk=$false } } else { Log 'Firefox Store nao instalado | Packages nao foi varrido' }; $FirefoxOk=$FirefoxRoamingOk -and $FirefoxLocalOk -and $FirefoxStoreOk; $swFirefox.Stop(); Log ('ETAPA Firefox total = {0} ms | resultado={1}' -f $swFirefox.ElapsedMilliseconds,$FirefoxOk); $ResultadoFinal=$ChromeOk -and $EdgeOk -and $FirefoxOk; $TempoTotal.Stop(); Log ('RESULTADO 3.0A | Metodo={0} | Chrome={1} | Edge={2} | Firefox={3} | Final={4} | TempoTotal={5} ms' -f $MetodoRemocao,$ChromeOk,$EdgeOk,$FirefoxOk,$ResultadoFinal,$TempoTotal.ElapsedMilliseconds); if($ResultadoFinal) { exit 0 } else { exit 1 } }"
```

## 4. Conferir e salvar a tarefa

1. Na guia **Condições**, confira se restrições de energia ou ociosidade não impedirão a execução no logon da estação. Para uso também em bateria, desmarque a condição que permite iniciar a tarefa somente em energia elétrica.
2. Na guia **Configurações**, mantenha a execução sob demanda habilitada. Em **Se a tarefa já estiver em execução**, selecione **Não iniciar uma nova instância**.
3. Clique em **OK** para salvar.
4. Confirme que a tarefa está habilitada e vinculada à conta correta.

`-WindowStyle Hidden` solicita uma janela oculta; uma aparição breve da janela ainda pode ocorrer.

## 5. Validar a configuração

Faça a primeira validação na conta de testes, depois de salvar e fechar qualquer trabalho nos navegadores.

1. Selecione a tarefa e clique em **Executar** para testar a ação manualmente.
2. Atualize a lista do Agendador e confira **Resultado da Última Execução**: `0x0` corresponde ao sucesso informado pela rotina; `0x1` indica falha na limpeza.
3. Consulte o log descrito na próxima seção e confira os resultados individuais de Chrome, Edge e Firefox.
4. Saia da conta do Windows e entre novamente para validar também o disparador de logon.
5. Confira o novo horário de execução e o log, e abra os navegadores para verificar a recriação de seus perfis locais.

Uma pasta inexistente é considerada sucesso pela rotina. Por isso, código `0x0` sozinho não comprova que havia dados e que eles foram removidos. Use dados descartáveis no teste e confira o comportamento dos navegadores. Outros códigos do Agendador podem indicar problemas ao iniciar a ação, antes mesmo da limpeza.

## 6. Consultar o log

Pressione **Win + R**, informe o caminho abaixo e pressione **Enter**:

```text
%TEMP%\SanitizacaoNavegadores_3.0A.log
```

Outra opção é abrir `%TEMP%` e procurar **`SanitizacaoNavegadores_3.0A.log`**. Faça isso na mesma conta que executou a tarefa.

O log é habilitado com `$FalharSilenciosamente=$false`. Ele registra o método selecionado, as tentativas, os tempos, erros de remoção, resultados de cada navegador e o resultado final. Na linha final, procure `Metodo=dotnet` e `Final=True`; se houver `Final=False`, consulte as etapas anteriores para identificar a falha.

O arquivo é reiniciado a cada execução com log habilitado. Copie-o antes de um novo teste se quiser preservar o diagnóstico. Falhas ao gravar o log são ignoradas pela rotina; a ausência do arquivo exige conferir a execução e a permissão de escrita na pasta temporária.

## Parâmetros da configuração

| Parâmetro | Valor neste tutorial | Finalidade |
| --- | --- | --- |
| `$MetodoRemocao` | `'dotnet'` | Seleciona a exclusão recursiva via .NET |
| `$FalharSilenciosamente` | `$false` | Habilita a tentativa de gravação do log |
| `$MaxTentativas` | `3` | Limita as tentativas de remoção por diretório |
| `$TimeoutProcessosSeg` | `4` | Limita o tempo de espera por chamada de encerramento dos processos |
| `$IntervaloVerificacaoMs` | `200` | Define a pausa entre verificações dos processos |
| `$LogPath` | `%TEMP%\SanitizacaoNavegadores_3.0A.log` | Define o arquivo de diagnóstico da conta executora |

## Escopo da limpeza

A rotina atua nos diretórios locais de perfil de Chrome e Edge e nos diretórios Roaming e Local do Firefox. Também consulta a instalação do Firefox pela Microsoft Store; quando a consulta falha, tenta localizar os diretórios correspondentes em `Packages`.

Arquivos em **Downloads, Documentos e Área de Trabalho** ficam fora dessa limpeza. Dados em serviços remotos também ficam fora do alcance da rotina: excluir um perfil local não garante revogação de sessões no servidor, e a sincronização do navegador pode trazer dados de volta após uma nova autenticação. A exclusão de diretórios não equivale a apagamento seguro do disco.

## Desativar a execução automática

Abra o Agendador de Tarefas, localize **Sanitização Automática dos Navegadores**, clique com o botão direito e selecione **Desabilitar**. Para retirar a configuração definitivamente, selecione **Excluir**. Isso interrompe execuções futuras e não restaura perfis já removidos.

## Documentação relacionada

- [Documento de Arquitetura de Software e Histórico de Versões (PDF)](../../public/documentos/documento-arquitetura-hardening.pdf)
- [README da cartilha](../../README.md)

Este tutorial documenta a configuração fornecida pela equipe; os resultados de execução devem ser conferidos no ambiente em que a ferramenta será utilizada.
